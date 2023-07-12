declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXTAUTH_API: string;
    readonly NEXT_PUBLIC_API: string;
  }
}
