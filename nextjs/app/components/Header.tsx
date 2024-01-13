import WalletConnection from './WalletConnection';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2 font-semibold">
        <span className="text-black">ExampleStore</span>
      </div>
      <WalletConnection />
    </header>
  );
}
