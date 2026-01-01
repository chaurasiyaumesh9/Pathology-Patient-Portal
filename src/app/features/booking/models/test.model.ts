export interface Test {
    id: number;
    name: string;
    code: string;
    category: number;
    description: string;
    instructions: string[];
    original_price: number;
    discounted_price: number;
    keywords: string;
}

export interface TestCategory {
    id: number;
    name: string;
}

export interface AppointmentSlot {
    date: string;   // ISO string
    time: string;   // e.g. "09:30"
}

export const PAYMENT_STATUS = {
    IDLE: 'idle',
    PROCESSING: 'processing',
    SUCCESS: 'success',
    FAILED: 'failed'
} as const;
  
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export interface SampleCollectionDay {
    date: string;
    slots: string[];
}