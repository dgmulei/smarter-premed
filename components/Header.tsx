export default function Header() {
  return (
    <header
      className="fixed left-0 right-0 h-[24px] bg-[#86cac4] z-50"
      style={{
        top: 'env(safe-area-inset-top, 0)',
        paddingTop: 'env(safe-area-inset-top, 0)'
      }}
    ></header>
  );
}
