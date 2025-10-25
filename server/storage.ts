import { type User, type InsertUser, type Payment, type InsertPayment, users, payments } from "@shared/schema";
import { randomUUID } from "crypto";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import { Pool } from "@neondatabase/serverless";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentByInvictusTransactionId(transactionId: string): Promise<Payment | undefined>;
  getPaymentByToken(token: string): Promise<Payment | undefined>;
  updatePaymentStatus(id: string, status: string): Promise<Payment | undefined>;
  updatePaymentTransactionId(id: string, transactionId: string): Promise<Payment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.payments = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const now = new Date();
    const payment: Payment = {
      id,
      invictusPayTransactionId: insertPayment.invictusPayTransactionId || null,
      status: insertPayment.status || 'pending',
      plan: insertPayment.plan,
      amount: insertPayment.amount,
      downloadToken: insertPayment.downloadToken || null,
      paymentMethod: insertPayment.paymentMethod || null,
      customerEmail: insertPayment.customerEmail || null,
      createdAt: now,
      updatedAt: now,
    };
    this.payments.set(id, payment);
    return payment;
  }

  async getPaymentByInvictusTransactionId(transactionId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(
      (payment) => payment.invictusPayTransactionId === transactionId,
    );
  }

  async getPaymentByToken(token: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(
      (payment) => payment.downloadToken === token,
    );
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (payment) {
      const updatedPayment = { ...payment, status, updatedAt: new Date() };
      this.payments.set(id, updatedPayment);
      return updatedPayment;
    }
    return undefined;
  }

  async updatePaymentTransactionId(id: string, transactionId: string): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (payment) {
      const updatedPayment = { ...payment, invictusPayTransactionId: transactionId, updatedAt: new Date() };
      this.payments.set(id, updatedPayment);
      return updatedPayment;
    }
    return undefined;
  }
}

export class DBStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const result = await this.db.insert(payments).values(insertPayment).returning();
    return result[0];
  }

  async getPaymentByInvictusTransactionId(transactionId: string): Promise<Payment | undefined> {
    const result = await this.db.select().from(payments).where(eq(payments.invictusPayTransactionId, transactionId)).limit(1);
    return result[0];
  }

  async getPaymentByToken(token: string): Promise<Payment | undefined> {
    const result = await this.db.select().from(payments).where(eq(payments.downloadToken, token)).limit(1);
    return result[0];
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment | undefined> {
    const result = await this.db
      .update(payments)
      .set({ status, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }

  async updatePaymentTransactionId(id: string, transactionId: string): Promise<Payment | undefined> {
    const result = await this.db
      .update(payments)
      .set({ invictusPayTransactionId: transactionId, updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result[0];
  }
}

export const storage = new MemStorage();
