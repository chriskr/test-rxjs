import { action$, dispatchAction } from 'rxbeach';
import { filter, tap } from 'rxjs/operators';

const log = (...args: string[]) => {
  const pre = document.querySelector('pre');
  if (!pre) return;
  pre.textContent += `${args.join(', ')}\n`;
};

// test

const ONE = 'ONE';
const TWO = 'TWO';

const test = () => {
  action$.pipe(tap(({ type }) => log('before', type))).subscribe();
  action$
    .pipe(
      filter(({ type }) => type === ONE),
      tap(() => dispatchAction({ type: TWO, meta: {} }))
    )
    .subscribe();
  action$.pipe(tap(({ type }) => log('after', type))).subscribe();
  dispatchAction({ type: ONE, meta: {} });
};

// end test

const displayCodeAndRunTest = async () => {
  try {
    const res = await fetch('./script.ts');
    const code = await res.text();
    const snippet = code.match(
      new RegExp(String.raw`(?<=// test).*?(?=// end test)`, 's')
    );
    if (snippet) log(snippet[0]);
    log('log test():\n');
    test();
  } catch (e) {}
};

displayCodeAndRunTest();
