declare function fbq(...args: unknown[]): void;

interface Window {
  fbq?: typeof fbq;
}
