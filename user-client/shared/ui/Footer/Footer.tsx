export function Footer() {
  return (
    <footer className="py-8 sm:py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <ul className="flex flex-col gap-4 text-base sm:text-lg">
          <li>
            <a href="/" className="text-xl sm:text-[28.5px] font-bold">
              NikolayYakunin.
            </a>
          </li>
          <li>
            <a
              href="https://t.me/Nicolay_Yakunin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Telegram
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Nikolay-Yakunin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:akuninn52@gmail.com" className="hover:underline">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
