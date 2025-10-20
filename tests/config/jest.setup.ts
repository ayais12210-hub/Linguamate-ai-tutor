import 'whatwg-url';

// MSW setup - using dynamic import to handle ESM issues
let server: any = null;

beforeAll(async () => {
  try {
    const { server: mswServer } = await import('../msw/server');
    server = mswServer;
    server.listen({ onUnhandledRequest: 'warn' });
  } catch (error) {
    console.warn('MSW setup failed:', error);
  }
});

afterEach(() => {
  if (server) {
    server.resetHandlers();
  }
});

afterAll(() => {
  if (server) {
    server.close();
  }
});

// Set __DEV__ global for React Native (already declared by React Native types)
(global as any).__DEV__ = true;

global.crypto = {
  ...global.crypto,
  randomUUID: () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },
} as Crypto;

// Mock console methods to reduce noise in tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
