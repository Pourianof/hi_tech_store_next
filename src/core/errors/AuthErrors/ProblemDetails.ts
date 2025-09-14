export interface ProblemDetails {
  title: string;
  detail?: string;
  errors?: { [key: string]: string[] }[];
}
