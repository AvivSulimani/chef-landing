export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-24 text-center dark:bg-black">
      <h1 className="text-4xl font-semibold tracking-tight text-black dark:text-zinc-50">
        דף הנחיתה של השף — בדרך
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        התשתית מוכנה. העיצוב הסופי ייבנה ב-Claude Design ויוטמע כאן.
      </p>
    </div>
  );
}
