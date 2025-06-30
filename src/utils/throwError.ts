export const throwError = ({
  status = 500,
  message = 'An unknown error occured.',
  ...extra
}: {
  status?: number;
  message?: string;
  [key: string]: any;
}) => {
  const error = new Error(message);
  (error as any).status = status;

  // attach any additional fields (like context, tag, or phase)
  for (const key in extra) {
    (error as any)[key] = extra[key];
  }

  throw error;
};
