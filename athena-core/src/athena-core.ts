import { modalRef, ModalRefType, ModalType } from './ref/modalRef';
import { navigateRef } from './ref/navigateRef';

// -- Error Typing --
export type ThrowErrorInput = {
  status: number;
  message: string;
  meta?: Record<string, any>;
};

// -- Core Methods --
export function throwError({ status, message, meta }: ThrowErrorInput): never {
  const error = new Error(message);
  (error as any).status = status;
  if (meta) (error as any).meta = meta;
  throw error;
}

export function sealLog(message: string, context?: Record<string, any>) {
  console.log(`[AthenaSeal] ${message}`);
  if (context) console.table(context);
}

export function assert(
  condition: any,
  errorInput: ThrowErrorInput
): asserts condition {
  if (!condition) throwError(errorInput);
}

export const AthenaCore = {
  throwError,
  sealLog,
  assert,

  openModal(params: { title: string; message: string; type?: ModalType }) {
    if (modalRef.current) {
      modalRef.current.openModal(params);
    } else {
      console.warn('[AthenaCore] No modalRef available. Modal not exposed.');
    }
  },

  redirect(path: string) {
    navigateRef.goTo(path);
  },

  pingRoute(route: string, meta: Record<string, any> = {}) {
    const timestamp = new Date().toISOString();
    console.log(
      `[Athena Ping] ${timestamp} :: ${route}`,
      Object.keys(meta).length ? meta : ''
    );

    switch (route) {
      case '/unauthorized':
        AthenaCore.openModal({
          title: 'Session Expired',
          message: 'Please sign in again to continue.',
          type: 'warning',
        });
        break;

      case '/error/db':
        AthenaCore.reportPulse('db_error', {
          origin: 'fetchUserSession',
          ...meta,
        });
        break;
    }
  },

  reportPulse(label: string, details: Record<string, any> = {}) {
    console.log(`[Athena Pulse] :: ${label}`, details);
  },
};
