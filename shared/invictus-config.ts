export const INVICTUS_PAY_LINKS = {
  basico: process.env.INVICTUS_LINK_BASICO || "https://go.invictuspay.app.br/zxc1otywq0",
  completo: process.env.INVICTUS_LINK_COMPLETO || "https://go.invictuspay.app.br/zglneku5mq",
  premium: process.env.INVICTUS_LINK_PREMIUM || "https://go.invictuspay.app.br/fzc2zrighx",
  redacao: process.env.INVICTUS_LINK_REDACAO || "https://go.invictuspay.app.br/8dend2jf4c",
  
  "basico+redacao": process.env.INVICTUS_LINK_BASICO_REDACAO || "https://go.invictuspay.app.br/im9mxwl3q4",
  "completo+redacao": process.env.INVICTUS_LINK_COMPLETO_REDACAO || "https://go.invictuspay.app.br/9xvryf3mcq",
  "premium+redacao": process.env.INVICTUS_LINK_PREMIUM_REDACAO || "https://go.invictuspay.app.br/eanzct8ela",
} as const;

export type InvictusPlanId = keyof typeof INVICTUS_PAY_LINKS;

export function getInvictusCheckoutLink(planId: string): string {
  return INVICTUS_PAY_LINKS[planId as InvictusPlanId] || "";
}
