export type BISSchemeType =
  | 'Scheme I (ISI Mark)'
  | 'Scheme II (CRS - Compulsory Registration)'
  | 'Scheme IV (Certificate of Conformity)'
  | 'Scheme X (Management Systems)'
  | 'Hallmarking (Gold & Silver)'
  | 'FMCS (Foreign Manufacturers)'
  | 'Eco Mark (Green Products)';

export interface IndianStandard {
  id: string;
  code: string;
  year?: string;
  title: string;
  hindiTitle?: string;
  category: string;
  scheme: BISSchemeType;
  isMandatoryQCO: boolean;
  qcoDetails?: {
    ministry: string;
    orderTitle: string;
    gazetteNo: string;
    effectiveDate: string;
    msmeExemptionNotes?: string;
    penaltySection: string;
  };
  hsCodes: string[];
  internationalEquivalent?: string;
  scope: string;
  keyTestParameters: string[];
  requiredFactoryEquipment: string[];
  recognizedLabsCount: number;
  sampleTestingFeeEstimate: string;
  markingFeeGuideline: string;
  applicableTo: ('MSME' | 'Large Industry' | 'Importer' | 'Consumer')[];
}

export interface BISSchemeInfo {
  id: string;
  name: string;
  type: BISSchemeType;
  badge: string;
  tagline: string;
  overview: string;
  keyFeatures: string[];
  steps: {
    step: number;
    title: string;
    description: string;
    portalName?: string;
  }[];
  documentsRequired: string[];
  auditRequired: boolean;
  typicalTimeline: string;
  feeStructureSummary: string;
}

export interface RecognizedLab {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'BIS Laboratory' | 'Government Recognized' | 'NABL Accredited Private';
  coveredStandards: string[];
  address: string;
  contactEmail: string;
  phone: string;
}

export interface BISEvidence {
  standardCode?: string;
  standardTitle?: string;
  scheme?: string;
  isMandatory?: boolean;
  orderOrClause?: string;
  sourceUrl?: string;
}

export interface StructuredAccordionItem {
  title: string;
  content: string;
  badge?: string;
}

export interface StructuredChatResponse {
  type: 'clarification' | 'final_answer';
  // Clarification fields
  question?: string;
  contextHint?: string;
  quickReplies?: string[];
  canSkip?: boolean;
  // Final Answer fields
  shortAnswer?: string;
  why?: string;
  whatThisMeansForYou?: string;
  whatNext?: string[];
  evidence?: BISEvidence;
  clauseDetails?: string;
  testingDetails?: string;
  detailsAccordion?: StructuredAccordionItem[];
  sessionContext?: {
    product?: string;
    standardCode?: string;
    scheme?: string;
    topic?: string;
  };
  relatedOptions?: {
    label: string;
    action: 'view_standard' | 'view_scheme' | 'find_lab' | 'verify_huid' | 'verify_license' | 'ask_query';
    target?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  referencedStandards?: { code: string; title: string; scheme: string; mandatory: boolean }[];
  suggestedPrompts?: string[];
  structured?: StructuredChatResponse;
}

export interface PracticalFeasibility {
  isProducibleInRealLife: boolean;
  feasibilityScore: number; // 0 - 100
  verdictLabel: 'Highly Feasible for MSME' | 'Feasible with Moderate Setup' | 'Capital Intensive / High Capex' | 'High Technical Barrier';
  verdictSummary: string;
  estimatedInitialCapex: string;
  minimumSpaceRequired: string;
  estimatedSetupTimeline: string;
  rawMaterialAvailability: 'Easily Available Domestically' | 'Moderate / Regional Sourcing' | 'Import Dependent / Specialized';
  rawMaterialsSummary: string;
  productionStages: {
    stageNumber: number;
    title: string;
    description: string;
    criticalQualityPoint: string;
  }[];
  essentialFactoryMachinery: {
    machineName: string;
    purpose: string;
    approxCost?: string;
  }[];
  commonAuditPitfalls: string[];
}

export interface SpecAnalysisResult {
  productName: string;
  suggestedStandards: {
    code: string;
    title: string;
    confidence: 'High' | 'Medium' | 'Related';
    scheme: string;
    isMandatoryQCO: boolean;
    reason: string;
  }[];
  qcoStatus: {
    isMandatory: boolean;
    ministryNotice?: string;
    deadline?: string;
    exemptions?: string;
  };
  keyTestsRequired: string[];
  factoryInspectionChecklist: string[];
  manakOnlineProcedure: string[];
  msmeGuidance: string;
  practicalFeasibility?: PracticalFeasibility;
}

export interface LicensingCostInput {
  enterpriseType: 'micro' | 'small' | 'medium' | 'large';
  isWomanOrSCST: boolean;
  scheme: 'Scheme I (ISI Mark)' | 'Scheme II (CRS)' | 'FMCS' | 'Hallmarking';
  productCategory: string;
  annualTurnoverLakhs: number;
}

export interface PaymentMilestone {
  stageNumber: number;
  stageName: string;
  whenToPay: string;
  payableTo: string;
  amount: number;
  amountWithGst: number;
  description: string;
}

export interface LicensingCostBreakdown {
  productName: string;
  standardCode: string;
  scheme: string;
  applicationFee: number;
  annualLicenseFee: number;
  inspectionFee: number;
  labTestingFeeEstimate: number;
  markingFeeBase: number;
  concessionPercentage: number;
  concessionAmount: number;
  netEstimatedCost: number;
  gstAmount: number;
  totalWithGst: number;
  standardLargeIndustryTotal: number;
  msmeSavings: number;
  timelineWeeks: string;
  fastTrackDays?: number;
  officialReference: string;
  paymentStages: PaymentMilestone[];
  keyRequirements: string[];
  simplifiedOptionAvailable: boolean;
  hallmarkingPerPieceRate?: number;
  isMandatoryQCO?: boolean;
  qcoName?: string;
  isCertifiable?: boolean;
  nonCertifiableReason?: string;
  regulatoryAuthority?: string;
  suggestedValidProducts?: string[];
  processSteps?: {
    stepNumber: number;
    title: string;
    detail: string;
    where: string;
  }[];
  feeReductionTips?: {
    title: string;
    savings: string;
    explanation: string;
    badge: string;
  }[];
}
