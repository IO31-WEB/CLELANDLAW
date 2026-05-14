import { z } from "zod";

export const PackageIdSchema = z.enum(["will", "trust", "complete"]);

export const IntakeSchema = z.object({
  // Personal
  firstName:   z.string().min(1).max(100),
  lastName:    z.string().min(1).max(100),
  email:       z.string().email(),
  phone:       z.string().min(7).max(30),
  state:       z.literal("Florida"),

  // Family
  familyStatus:           z.string().min(1),
  spouseName:             z.string().max(200).optional(),
  children:               z.string().max(2000).optional(),

  // Beneficiaries
  primaryBeneficiary:     z.string().min(1).max(500),
  contingentBeneficiary:  z.string().max(500).optional(),

  // Representatives
  personalRepresentative: z.string().min(1).max(500),
  successor:              z.string().max(500).optional(),

  // Assets & notes
  assets:              z.string().max(5000).optional(),
  specialInstructions: z.string().max(5000).optional(),

  // Consent
  consentAcceptedAt:  z.string().datetime(),
  consentIpAddress:   z.string().max(100),
});

export const CreateOrderSchema = z.object({
  packageId: PackageIdSchema,
  intake:    IntakeSchema,
});

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>;
export type IntakeData       = z.infer<typeof IntakeSchema>;
