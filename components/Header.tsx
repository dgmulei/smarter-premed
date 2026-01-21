export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-[#0d9488] z-50 flex items-center px-5 sm:px-8">
      <div className="flex items-baseline gap-2">
        <h1
          className="text-white text-[22px] font-semibold tracking-tight"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Fitfinder
        </h1>
        <span
          className="text-white/80 text-[14px]"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          by Smarter Premed
        </span>
      </div>
    </header>
  );
}
