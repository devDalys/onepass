import Script from 'next/script';

export const YaMetrica = () => {
  return (
    <>
      <Script
        id="yandex-metrica"
        type="text/javascript"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            ' (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n' +
            '          m[i].l=1*new Date();\n' +
            '          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n' +
            '          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
            '          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");\n' +
            '\n' +
            '          ym(96510886, "init", {\n' +
            '          clickmap:true,\n' +
            '          trackLinks:true,\n' +
            '          accurateTrackBounce:true\n' +
            '      });',
        }}
      ></Script>
      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/96510886"
            style={{position: 'absolute', left: '-9999px'}}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};
