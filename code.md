## File: ./codemagic.yaml
```
workflows:
  capacitor-android:
    name: Capacitor Android APK

    environment:
      node: latest
      java: 21

    scripts:
      - name: Install dependencies
        script: |
          npm install

      - name: Build web app
        script: |
          npm run build

      - name: Sync Capacitor
        script: |
          npx cap sync

      - name: Build Android APK
        script: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

    artifacts:
      - android/app/build/outputs/**/*.apk
```

## File: ./eslint.config.js
```
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
```

## File: ./index.html
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>upcat-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: ./public/favicon.svg
```
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>```

## File: ./public/icons.svg
```
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

## File: ./src/App.css
```
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

## File: ./src/App.jsx
```
// src/App.jsx – Full College Quiz Reviewer with requested features
import { useState, useEffect, useRef } from "react";
import seedCategories from "./data/questions.json";
import seedLectures from "./data/lectures.json";

// ─────────────────────────────── BASE CATEGORIES ───────────────────────────────
// ─────────────────────────────── QUIZ DATA NORMALIZATION ───────────────────────────────
const normalizeAnswer = (str) => {
  if (str === null || str === undefined) return "";
  return String(str).trim().toLowerCase().replace(/\s+/g, "");
};

const normalizeSubjectData = (rawCategories) => {
  const result = {};
  Object.entries(rawCategories || {}).forEach(([id, cat]) => {
    const level1 = Array.isArray(cat?.level1) ? cat.level1 : (Array.isArray(cat?.items) ? cat.items : []);
    let level2 = Array.isArray(cat?.level2) ? cat.level2 : [];

    // Backward-compatible fallback: old MC questions can generate identification items.
    if (level2.length === 0 && level1.length > 0) {
      level2 = level1.map((q, index) => ({
        id: `${q.id || `l1_${index}`}_id`,
        q: q.q,
        answer: Array.isArray(q.choices) && q.ans !== undefined ? q.choices[q.ans] : "",
        exp: q.exp || ""
      })).filter(q => q.answer);
    }

    result[id] = {
      label: cat?.label || id,
      icon: cat?.icon || "📌",
      color: cat?.color || "#4F8EF7",
      level1,
      level2
    };
  });
  return result;
};

const BASE_CATEGORIES = normalizeSubjectData(seedCategories);
const BASE_LECTURES = seedLectures;

const AI_APPS = [
  { id: "chatgpt", label: "ChatGPT", icon: "🤖", url: "https://chatgpt.com/" },
  { id: "claude", label: "Claude", icon: "✦", url: "https://claude.ai/new" },
  { id: "gemini", label: "Gemini", icon: "✨", url: "https://gemini.google.com/app" },
  { id: "perplexity", label: "Perplexity", icon: "🔍", url: "https://www.perplexity.ai/" },
];

// ─────────────────────────────── THEMES ───────────────────────────────
const THEMES = {
  dark: {
    name: "Night Mode", icon: "🌙",
    bg: "linear-gradient(135deg,#080C18 0%,#0C1828 55%,#080C18 100%)",
    surface: "rgba(255,255,255,0.045)", surfaceBorder: "rgba(255,255,255,0.09)", surfaceHover: "rgba(255,255,255,0.07)",
    text: "#E4EAF4", textSub: "#8FA3BE", textMuted: "#445568",
    accent: "#4F8EF7", accentGrad: "linear-gradient(135deg,#4F8EF7,#9B6FF5)", accentGrad2: "linear-gradient(135deg,#9B6FF5,#F06EBA)",
    success: "#12C383", successBg: "rgba(18,195,131,0.13)", successBorder: "rgba(18,195,131,0.32)", successText: "#6EE7C0",
    danger: "#F05060", dangerBg: "rgba(240,80,96,0.13)", dangerBorder: "rgba(240,80,96,0.32)", dangerText: "#FFA5AE",
    inputBg: "rgba(255,255,255,0.055)", inputBorder: "rgba(255,255,255,0.11)", modalBg: "#0C1828",
    progressBg: "rgba(255,255,255,0.09)", headFont: "'Space Grotesk',sans-serif", bodyFont: "'Inter',system-ui,sans-serif",
    gFonts: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap",
    t1: "#4F8EF7", t2: "#C4B5FD"
  },
  girl: {
    name: "Blossom", icon: "🌸",
    bg: "linear-gradient(135deg,#FEF0F5 0%,#FCE8F0 40%,#F3E8FF 100%)",
    surface: "rgba(255,255,255,0.82)", surfaceBorder: "rgba(236,72,153,0.13)", surfaceHover: "rgba(251,207,232,0.42)",
    text: "#4A1040", textSub: "#9D4080", textMuted: "#B85C8E",
    accent: "#E8187A", accentGrad: "linear-gradient(135deg,#F472B6,#A855F7)", accentGrad2: "linear-gradient(135deg,#FB7185,#F472B6)",
    success: "#047857", successBg: "rgba(4,120,87,0.1)", successBorder: "rgba(4,120,87,0.24)", successText: "#065F46",
    danger: "#BE123C", dangerBg: "rgba(190,18,60,0.08)", dangerBorder: "rgba(190,18,60,0.2)", dangerText: "#9F1239",
    inputBg: "rgba(255,255,255,0.95)", inputBorder: "rgba(236,72,153,0.22)", modalBg: "#FFF4F9",
    progressBg: "rgba(236,72,153,0.11)", headFont: "'Playfair Display',serif", bodyFont: "'Nunito',sans-serif",
    gFonts: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;600;700;800;900&display=swap",
    t1: "#E8187A", t2: "#A855F7"
  }
};

// ─────────────────────────────── HELPERS ───────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const randomizeChoicesPreserveAnswer = (question) => {
  const originalChoices = [...question.choices];
  const correctChoice = originalChoices[question.ans];
  const shuffled = shuffleArray(originalChoices);
  const newCorrectIndex = shuffled.findIndex(ch => ch === correctChoice);
  return { ...question, choices: shuffled, ans: newCorrectIndex };
};

const renderQuestionText = (text, themeTextColor) => {
  const shapeMap = {
    '▲': { label: '▲', bg: '#e74c3c', color: 'white' },
    '■': { label: '■', bg: '#3498db', color: 'white' },
    '●': { label: '●', bg: '#2ecc71', color: 'white' },
    '◆': { label: '◆', bg: '#9b59b6', color: 'white' },
    '★': { label: '★', bg: '#f1c40f', color: '#333' },
    '▪': { label: '▪', bg: '#95a5a6', color: 'white' },
    '▴': { label: '▴', bg: '#e67e22', color: 'white' },
    '▾': { label: '▾', bg: '#e67e22', color: 'white' },
    '◂': { label: '◂', bg: '#1abc9c', color: 'white' },
    '▸': { label: '▸', bg: '#1abc9c', color: 'white' }
  };
  let parts = [];
  let lastIndex = 0;
  const regex = /[▲■●◆★▪▴▾◂▸]/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`txt-${lastIndex}`} style={{ color: themeTextColor }}>{text.slice(lastIndex, match.index)}</span>);
    }
    const shape = match[0];
    const style = shapeMap[shape] || { label: shape, bg: '#888', color: 'white' };
    parts.push(
      <span key={`shape-${match.index}`} style={{
        display: 'inline-block', width: '1.8em', height: '1.8em', lineHeight: '1.8em',
        textAlign: 'center', background: style.bg, color: style.color,
        borderRadius: '6px', fontWeight: 'bold', margin: '0 2px', fontSize: '1.2em'
      }}>{style.label}</span>
    );
    lastIndex = match.index + 1;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={`txt-end`} style={{ color: themeTextColor }}>{text.slice(lastIndex)}</span>);
  }
  return parts.length ? parts : text;
};

function buildParagraphPrompt(paragraph, chapterTitle, subjLabel) {
  return `Ako ay nag-aaral para sa aking quiz${subjLabel ? " (subject: " + subjLabel + ")" : ""}${chapterTitle ? ", chapter: " + chapterTitle : ""}. Paki-explain nang mas detalyado at bigyan ng dagdag na halimbawa ang sumusunod na bahagi ng lecture:

${paragraph}`;
}

const STORAGE = {
  USER_NAME: "quiz_user_name",
  USER_HISTORY: "quiz_user_history",
  CUSTOM_CATS: "quiz_custom_categories",
  LECTURE_CATS: "quiz_custom_lectures",
  SETTINGS: "quiz_settings",
  QUIZ_PROGRESS: "quiz_quiz_progress"
};

// User-created data must survive future app updates.
// Built-in data comes from src/data/* and custom data stays in localStorage.
const safeStorageGet = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
};

const safeStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

export default function App() {
  const [theme, setTheme] = useState("dark");
  const T = THEMES[theme];

  // User data
  const [userName, setUserName] = useState(() => safeStorageGet(STORAGE.USER_NAME) || "Reviewee");
  const [userHistory, setUserHistory] = useState(() => {
    const saved = safeStorageGet(STORAGE.USER_HISTORY);
    return saved ? JSON.parse(saved) : [];
  });
  const [customCategories, setCustomCategories] = useState(() => {
    const saved = safeStorageGet(STORAGE.CUSTOM_CATS);
    return saved ? normalizeSubjectData(JSON.parse(saved)) : {};
  });
  const [customLectures, setCustomLectures] = useState(() => {
    const saved = safeStorageGet(STORAGE.LECTURE_CATS);
    return saved ? JSON.parse(saved) : {};
  });

  const [settings, setSettings] = useState(() => {
    const saved = safeStorageGet(STORAGE.SETTINGS);
    return saved ? JSON.parse(saved) : { randomizeChoices: false, studyMode: false };
  });
  const [quizProgress, setQuizProgress] = useState(() => {
    const saved = safeStorageGet(STORAGE.QUIZ_PROGRESS);
    return saved ? JSON.parse(saved) : null;
  });

  // UI state
  const [screen, setScreen] = useState("home");
  const [selectedCats, setSelectedCats] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [quizLevel, setQuizLevel] = useState(1); // 1 = Multiple Choice, 2 = Identification
  const [textInputAnswer, setTextInputAnswer] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizHistoryDetails, setQuizHistoryDetails] = useState([]);
  const [flaggedSet, setFlaggedSet] = useState(new Set());
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Timer state
  const [timerMode, setTimerMode] = useState("off");
  const [timerSeconds, setTimerSeconds] = useState(25);
  const [timeLeft, setTimeLeft] = useState(null);
  const timerIntervalRef = useRef(null);

  // Study mode
  const [studyMode, setStudyMode] = useState(settings.studyMode);

  // Modals
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState(null);
  const [catForm, setCatForm] = useState({ id: "", label: "", icon: "📌", color: "#4F8EF7" });
  const [selectedCatForQuestion, setSelectedCatForQuestion] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionModalLevel, setQuestionModalLevel] = useState(1);
  const [questionForm, setQuestionForm] = useState({ q: "", choices: ["", "", "", ""], ans: 0, exp: "" });
  const [questionFormL2, setQuestionFormL2] = useState({ q: "", answer: "", exp: "" });

  // Dev panel
  const [devJsonInput, setDevJsonInput] = useState("");
  const [devLectureJsonInput, setDevLectureJsonInput] = useState("");
  const [devUnlocked, setDevUnlocked] = useState(false);
  const [studySubject, setStudySubject] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  // PWA / Offline state
  const [isOffline, setIsOffline] = useState(() => typeof navigator !== "undefined" ? !navigator.onLine : false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  const allCategories = normalizeSubjectData({ ...BASE_CATEGORIES, ...customCategories });
  const allLectures = { ...BASE_LECTURES, ...customLectures };

  // PWA: register the service worker and manifest so the app can be installed and used offline.
  useEffect(() => {
    const base = import.meta.env.BASE_URL || "/";
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement("link");
      manifestLink.rel = "manifest";
      document.head.appendChild(manifestLink);
    }
    manifestLink.href = `${base}manifest.webmanifest`;

    const updateOnlineState = () => setIsOffline(!navigator.onLine);
    window.addEventListener("online", updateOnlineState);
    window.addEventListener("offline", updateOnlineState);

    const handleInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const handleInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleInstalled);
    setIsInstalled(window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true);

    if ("serviceWorker" in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register(`${base}sw.js`, { scope: base })
        .then(() => console.log("Offline mode ready"))
        .catch(err => console.warn("Offline mode could not be enabled:", err));
    }

    return () => {
      window.removeEventListener("online", updateOnlineState);
      window.removeEventListener("offline", updateOnlineState);
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    try { await installPrompt.userChoice; } catch {}
    setInstallPrompt(null);
  };

  // Persistence
  useEffect(() => { safeStorageSet(STORAGE.USER_NAME, userName); }, [userName]);
  useEffect(() => { safeStorageSet(STORAGE.USER_HISTORY, JSON.stringify(userHistory)); }, [userHistory]);
  useEffect(() => { safeStorageSet(STORAGE.CUSTOM_CATS, JSON.stringify(customCategories)); }, [customCategories]);
  useEffect(() => { safeStorageSet(STORAGE.LECTURE_CATS, JSON.stringify(customLectures)); }, [customLectures]);
  useEffect(() => { safeStorageSet(STORAGE.SETTINGS, JSON.stringify(settings)); }, [settings]);
  useEffect(() => {
    if (quizProgress) safeStorageSet(STORAGE.QUIZ_PROGRESS, JSON.stringify(quizProgress));
    else try { localStorage.removeItem(STORAGE.QUIZ_PROGRESS); } catch {};
  }, [quizProgress]);

  const showToastMsg = (msg, type = "ok") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  };

  // Timer functions
  const stopTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };

  const startTimer = (seconds) => {
    stopTimer();
    setTimeLeft(seconds);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          if (screen === "quiz" && !isAnswered) {
            showToastMsg("Time's up!", "err");
            if (quizLevel === 1) handleAnswerLevel1(-1);
            else handleAnswerLevel2Timeout();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimerForQuestion = () => {
    if (timerMode === "perQuestion" && !isAnswered) {
      startTimer(25);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (screen !== "quiz") return;
      if (quizLevel === 1 && e.key >= '1' && e.key <= '4') {
        const idx = parseInt(e.key) - 1;
        if (idx < (quizQuestions[currentIndex]?.choices?.length || 0) && !isAnswered) handleAnswerLevel1(idx);
      } else if (quizLevel === 2 && e.key === 'Enter' && !isAnswered) {
        handleAnswerLevel2();
      } else if (e.key === 'Enter' && isAnswered) {
        nextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, isAnswered, currentIndex, quizQuestions, quizLevel, textInputAnswer]);

  const startQuiz = (catId, level = 1, useTimer = true) => {
    const cats = Array.isArray(catId) ? catId : [catId];
    const selectedSubject = cats[0];
    if (!selectedSubject || !allCategories[selectedSubject]) {
      showToastMsg("Select a valid subject!", "err");
      return;
    }

    let questions = [];
    cats.forEach(id => {
      const cat = allCategories[id];
      if (!cat) return;
      const source = level === 1 ? cat.level1 : cat.level2;
      questions.push(...(source || []).map(q => ({ ...q, catId: id, catLabel: cat.label, catIcon: cat.icon })));
    });

    if (questions.length === 0) {
      showToastMsg(`Wala pang tanong para sa Level ${level} ng subject na ito!`, "err");
      return;
    }

    if (level === 1 && settings.randomizeChoices) {
      questions = questions.map(q => randomizeChoicesPreserveAnswer(q));
    }

    const shuffledQs = shuffleArray(questions);
    setQuizLevel(level);
    setQuizQuestions(shuffledQs);
    setSelectedCats(cats);
    setCurrentIndex(0);
    setSelectedChoice(null);
    setTextInputAnswer("");
    setIsAnswered(false);
    setIsCorrectAnswer(false);
    setQuizScore(0);
    setQuizHistoryDetails([]);
    setFlaggedSet(new Set());
    setShowFlaggedOnly(false);
    setQuizProgress(null);
    setScreen("quiz");

    if (useTimer) {
      setTimerMode("perQuestion");
      setTimerSeconds(25);
      startTimer(25);
    } else {
      setTimerMode("off");
      setTimerSeconds(0);
      stopTimer();
      setTimeLeft(null);
    }
  };

  const resumeQuiz = () => {
    if (!quizProgress) return;
    setQuizQuestions(quizProgress.questions || []);
    setQuizLevel(quizProgress.level || 1);
    setCurrentIndex(quizProgress.currentIndex || 0);
    setSelectedChoice(quizProgress.selectedChoice ?? null);
    setTextInputAnswer(quizProgress.textInputAnswer || "");
    setIsAnswered(!!quizProgress.isAnswered);
    setIsCorrectAnswer(!!quizProgress.isCorrectAnswer);
    setQuizScore(quizProgress.score || 0);
    setQuizHistoryDetails(quizProgress.history || []);
    setFlaggedSet(new Set(quizProgress.flagged || []));
    setSelectedCats(quizProgress.selectedCats || []);
    setScreen("quiz");
    if (quizProgress.timerMode && quizProgress.timerMode !== "off") {
      setTimerMode(quizProgress.timerMode);
      setTimerSeconds(quizProgress.timerSeconds || 25);
      if (quizProgress.timeLeft) startTimer(quizProgress.timeLeft);
    } else {
      setTimerMode("off");
      setTimeLeft(null);
    }
  };

  const saveProgress = () => {
    if (screen === "quiz" && quizQuestions.length) {
      setQuizProgress({
        questions: quizQuestions,
        level: quizLevel,
        currentIndex,
        selectedChoice,
        textInputAnswer,
        isAnswered,
        isCorrectAnswer,
        score: quizScore,
        history: quizHistoryDetails,
        flagged: Array.from(flaggedSet),
        selectedCats,
        timerMode,
        timerSeconds,
        timeLeft
      });
      showToastMsg("Progress saved!", "ok");
    }
  };

  const handleAnswerLevel1 = (choiceIdx) => {
    if (isAnswered) return;
    const q = quizQuestions[currentIndex];
    const correct = choiceIdx === q.ans;
    stopTimer();
    setSelectedChoice(choiceIdx);
    setIsCorrectAnswer(correct);
    setIsAnswered(true);
    if (correct && !studyMode) setQuizScore(prev => prev + 1);
    setQuizHistoryDetails(prev => [...prev, { q, selected: choiceIdx, correct, level: 1 }]);
  };

  const handleAnswerLevel2 = () => {
    if (isAnswered) return;
    const q = quizQuestions[currentIndex];
    const correct = normalizeAnswer(textInputAnswer) !== "" && normalizeAnswer(textInputAnswer) === normalizeAnswer(q.answer);
    stopTimer();
    setIsCorrectAnswer(correct);
    setIsAnswered(true);
    if (correct && !studyMode) setQuizScore(prev => prev + 1);
    setQuizHistoryDetails(prev => [...prev, { q, userText: textInputAnswer, correct, level: 2 }]);
  };

  const handleAnswerLevel2Timeout = () => {
    if (isAnswered) return;
    const q = quizQuestions[currentIndex];
    setIsCorrectAnswer(false);
    setIsAnswered(true);
    setQuizHistoryDetails(prev => [...prev, { q, userText: "(No Answer - Time Out)", correct: false, level: 2 }]);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= quizQuestions.length) {
      const total = quizQuestions.length;
      const finalScore = studyMode ? 0 : quizScore + (isAnswered && isCorrectAnswer ? 1 : 0);
      const percent = studyMode ? 0 : Math.round((finalScore / total) * 100);
      const newRecord = {
        id: uid(), date: new Date().toISOString(), categories: selectedCats,
        level: quizLevel, totalQs: total, score: finalScore, percent,
        details: quizHistoryDetails
      };
      if (!studyMode) setUserHistory(prev => [newRecord, ...prev]);
      setQuizProgress(null);
      stopTimer();
      setScreen("results");
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedChoice(null);
      setTextInputAnswer("");
      setIsAnswered(false);
      setIsCorrectAnswer(false);
      if (timerMode === "perQuestion") startTimer(25);
    }
  };

  const toggleFlag = () => {
    const qid = quizQuestions[currentIndex]?.id;
    if (!qid) return;
    const newSet = new Set(flaggedSet);
    if (newSet.has(qid)) newSet.delete(qid); else newSet.add(qid);
    setFlaggedSet(newSet);
    showToastMsg(newSet.has(qid) ? "Question flagged" : "Flag removed", "ok");
  };

  const getCategoryStats = () => {
    const stats = {};
    userHistory.forEach(rec => {
      rec.details?.forEach(detail => {
        const catId = detail.q.catId;
        if (!stats[catId]) stats[catId] = { total: 0, correct: 0 };
        stats[catId].total++;
        if (detail.correct) stats[catId].correct++;
      });
    });
    return stats;
  };

  // Category / Question CRUD — supports Level 1 (MC) and Level 2 (Identification)
  const openAddCategory = () => {
    setEditingCatId(null);
    setCatForm({ id: "", label: "", icon: "📌", color: "#4F8EF7" });
    setShowCatModal(true);
  };

  const openEditCategory = (catId) => {
    const cat = customCategories[catId];
    if (!cat) return;
    setEditingCatId(catId);
    setCatForm({ id: catId, label: cat.label, icon: cat.icon, color: cat.color });
    setShowCatModal(true);
  };

  const saveCategory = () => {
    if (!catForm.id || !catForm.label) { showToastMsg("Subject ID and Label required", "err"); return; }
    if (!editingCatId && (BASE_CATEGORIES[catForm.id] || customCategories[catForm.id])) {
      showToastMsg("Subject ID already exists", "err"); return;
    }
    const old = editingCatId ? customCategories[editingCatId] : null;
    const newCat = {
      label: catForm.label, icon: catForm.icon || "📌", color: catForm.color || "#4F8EF7",
      level1: old?.level1 || old?.items || [], level2: old?.level2 || []
    };
    setCustomCategories(prev => {
      if (editingCatId && editingCatId !== catForm.id) {
        const { [editingCatId]: removed, ...rest } = prev;
        return { ...rest, [catForm.id]: newCat };
      }
      return { ...prev, [catForm.id]: newCat };
    });
    setShowCatModal(false);
    showToastMsg(editingCatId ? "Subject updated" : "Subject added", "ok");
  };

  const deleteCategory = (catId) => {
    const cat = customCategories[catId];
    if (!cat) return;
    if (window.confirm(`Delete subject "${cat.label}" and all its questions?`)) {
      setCustomCategories(prev => {
        const { [catId]: removed, ...rest } = prev;
        return rest;
      });
      showToastMsg("Subject deleted", "ok");
    }
  };

  const deleteLecture = (lid) => {
    const lecture = customLectures[lid];
    if (!lecture) return;
    if (window.confirm(`Delete lecture subject "${lecture.label}"?`)) {
      setCustomLectures(prev => { const { [lid]: removed, ...rest } = prev; return rest; });
      showToastMsg("Lecture deleted", "ok");
    }
  };

  const openAddQuestion = (catId, level = 1) => {
    setSelectedCatForQuestion(catId);
    setQuestionModalLevel(level);
    setEditingQuestion(null);
    setQuestionForm({ q: "", choices: ["", "", "", ""], ans: 0, exp: "" });
    setQuestionFormL2({ q: "", answer: "", exp: "" });
    setShowQuestionModal(true);
  };

  const openEditQuestion = (catId, q, level = 1) => {
    setSelectedCatForQuestion(catId);
    setQuestionModalLevel(level);
    setEditingQuestion(q);
    if (level === 1) {
      setQuestionForm({ q: q.q || "", choices: [...(q.choices || ["", "", "", ""])], ans: q.ans ?? 0, exp: q.exp || "" });
    } else {
      setQuestionFormL2({ q: q.q || "", answer: q.answer || "", exp: q.exp || "" });
    }
    setShowQuestionModal(true);
  };

  const saveQuestion = () => {
    const cat = customCategories[selectedCatForQuestion];
    if (!cat) { showToastMsg("Only custom subjects can be edited here", "err"); return; }

    if (questionModalLevel === 1) {
      if (!questionForm.q || questionForm.choices.some(c => !c)) {
        showToastMsg("Question and all 4 choices required", "err"); return;
      }
      const newQuestion = { id: editingQuestion ? editingQuestion.id : uid(), ...questionForm };
      const current = cat.level1 || cat.items || [];
      const newItems = editingQuestion ? current.map(item => item.id === editingQuestion.id ? newQuestion : item) : [...current, newQuestion];
      setCustomCategories(prev => ({ ...prev, [selectedCatForQuestion]: { ...prev[selectedCatForQuestion], level1: newItems, level2: prev[selectedCatForQuestion].level2 || [] } }));
    } else {
      if (!questionFormL2.q || !questionFormL2.answer) {
        showToastMsg("Question and correct answer required", "err"); return;
      }
      const newQuestion = { id: editingQuestion ? editingQuestion.id : uid(), ...questionFormL2 };
      const current = cat.level2 || [];
      const newItems = editingQuestion ? current.map(item => item.id === editingQuestion.id ? newQuestion : item) : [...current, newQuestion];
      setCustomCategories(prev => ({ ...prev, [selectedCatForQuestion]: { ...prev[selectedCatForQuestion], level1: prev[selectedCatForQuestion].level1 || [], level2: newItems } }));
    }
    setShowQuestionModal(false);
    showToastMsg(editingQuestion ? "Question updated" : "Question added", "ok");
  };

  const deleteQuestion = (catId, qId, level = 1) => {
    if (!window.confirm("Delete this question?")) return;
    setCustomCategories(prev => {
      const cat = prev[catId];
      if (!cat) return prev;
      if (level === 1) return { ...prev, [catId]: { ...cat, level1: (cat.level1 || cat.items || []).filter(q => q.id !== qId) } };
      return { ...prev, [catId]: { ...cat, level2: (cat.level2 || []).filter(q => q.id !== qId) } };
    });
    showToastMsg("Question deleted", "ok");
  };

  const importJsonData = () => {
    let parsed;
    try { parsed = JSON.parse(devJsonInput); }
    catch (err) { showToastMsg("Invalid JSON: " + err.message, "err"); return; }
    const subjects = Array.isArray(parsed) ? parsed : [parsed];
    const next = { ...customCategories };
    let addedSubjects = 0, addedQuestions = 0, skipped = 0;

    subjects.forEach(subj => {
      if (!subj || !subj.id || !subj.label) { skipped++; return; }
      const level1 = Array.isArray(subj.level1) ? subj.level1 : (Array.isArray(subj.items) ? subj.items : []);
      const level2 = Array.isArray(subj.level2) ? subj.level2 : [];
      const incomingL1 = level1.filter(q => q && q.q && Array.isArray(q.choices) && q.choices.length >= 2 && typeof q.ans === "number").map(q => ({ id: q.id || uid(), q: q.q, choices: q.choices, ans: q.ans, exp: q.exp || "" }));
      const incomingL2 = level2.filter(q => q && q.q && q.answer !== undefined && String(q.answer).trim()).map(q => ({ id: q.id || uid(), q: q.q, answer: String(q.answer), exp: q.exp || "" }));
      const existing = allCategories[subj.id];
      const existingL1 = existing?.level1 || [];
      const existingL2 = existing?.level2 || [];
      const ids1 = new Set(existingL1.map(q => q.id));
      const ids2 = new Set(existingL2.map(q => q.id));
      const newL1 = incomingL1.filter(q => !ids1.has(q.id));
      const newL2 = incomingL2.filter(q => !ids2.has(q.id));
      next[subj.id] = {
        label: subj.label || existing?.label || subj.id,
        icon: subj.icon || existing?.icon || "📌",
        color: subj.color || existing?.color || "#4F8EF7",
        level1: [...existingL1, ...newL1], level2: [...existingL2, ...newL2]
      };
      if (!existing) addedSubjects++;
      addedQuestions += newL1.length + newL2.length;
    });

    if (addedQuestions === 0 && addedSubjects === 0) {
      showToastMsg(skipped ? "No valid subjects found in JSON" : "Nothing new to import", "err"); return;
    }
    setCustomCategories(next);
    setDevJsonInput("");
    showToastMsg(`Imported ${addedQuestions} question(s), ${addedSubjects} new subject(s)`, "ok");
  };

  const handleDevFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setDevJsonInput(ev.target.result);
    reader.onerror = () => showToastMsg("Could not read file", "err");
    reader.readAsText(file);
    e.target.value = "";
  };

  const exportJsonData = () => {
    const dataStr = JSON.stringify(allCategories, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "questions.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToastMsg("Downloaded questions.json", "ok");
  };

  // STUDY-ONLY JSON IMPORTER
  // Study data is completely independent from Quiz data.
  // Accepted study fields: chapters, sections, or lectures.
  // Internally everything is normalized to `chapters` because the Study UI uses that structure.
  const importLectureJsonData = () => {
    let parsed;
    try {
      parsed = JSON.parse(devLectureJsonInput);
    } catch (err) {
      showToastMsg("Invalid Study JSON: " + err.message, "err");
      return;
    }

    const subjects = Array.isArray(parsed) ? parsed : [parsed];
    const next = { ...customLectures };
    let addedSubjects = 0;
    let addedChapters = 0;
    let updatedChapters = 0;
    let skipped = 0;

    subjects.forEach(subj => {
      if (!subj || !subj.id || !subj.label) {
        skipped++;
        return;
      }

      // STUDY-ONLY DATA:
      // Never reads level1/level2/items from Quiz data.
      const rawChapters = Array.isArray(subj.chapters)
        ? subj.chapters
        : Array.isArray(subj.sections)
          ? subj.sections
          : Array.isArray(subj.lectures)
            ? subj.lectures
            : [];

      const incomingChapters = rawChapters
        .filter(ch => {
          if (!ch || !ch.title) return false;
          return typeof ch.content === "string" || typeof ch.text === "string";
        })
        .map(ch => ({
          id: ch.id || uid(),
          title: String(ch.title).trim(),
          content: String(ch.content ?? ch.text ?? "").trim(),

          // Preserve Study-specific Ask AI configuration.
          // If askAi is omitted, the Study UI will use its automatic fallback prompt.
          askAi: ch.askAi
            ? {
                enabled: ch.askAi.enabled !== false,
                context: String(ch.askAi.context || "").trim()
              }
            : undefined
        }))
        .filter(ch => ch.title && ch.content);

      if (incomingChapters.length === 0) {
        skipped++;
        return;
      }

      const existing = customLectures[subj.id];
      const existingChapters = Array.isArray(existing?.chapters)
        ? existing.chapters
        : [];

      // Same chapter ID = UPDATE.
      // New chapter ID = ADD.
      // This allows re-importing a JSON file after adding/editing askAi.
      const existingMap = new Map(
        existingChapters.map(ch => [ch.id, ch])
      );

      incomingChapters.forEach(ch => {
        if (existingMap.has(ch.id)) {
          existingMap.set(ch.id, ch);
          updatedChapters++;
        } else {
          existingMap.set(ch.id, ch);
          addedChapters++;
        }
      });

      const mergedChapters = Array.from(existingMap.values());

      if (existing) {
        next[subj.id] = {
          ...existing,
          label: subj.label || existing.label,
          icon: subj.icon || existing.icon || "📖",
          color: subj.color || existing.color || "#4F8EF7",
          chapters: mergedChapters
        };
      } else {
        next[subj.id] = {
          label: subj.label,
          icon: subj.icon || "📖",
          color: subj.color || "#4F8EF7",
          chapters: mergedChapters
        };
        addedSubjects++;
      }
    });

    if (addedChapters === 0 && updatedChapters === 0 && addedSubjects === 0) {
      showToastMsg(
        skipped
          ? "No valid Study subjects found. Use id + label + chapters/sections/lectures."
          : "Nothing new to import",
        "err"
      );
      return;
    }

    setCustomLectures(next);
    setDevLectureJsonInput("");

    const parts = [];
    if (addedChapters > 0) {
      parts.push(`${addedChapters} new section(s)`);
    }
    if (updatedChapters > 0) {
      parts.push(`${updatedChapters} updated section(s)`);
    }
    if (addedSubjects > 0) {
      parts.push(`${addedSubjects} new subject(s)`);
    }

    showToastMsg(`Study import complete: ${parts.join(", ")}`, "ok");
  };

  const handleDevLectureFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setDevLectureJsonInput(ev.target.result);
    reader.onerror = () => showToastMsg("Could not read file", "err");
    reader.readAsText(file);
    e.target.value = "";
  };

  const exportLectureJsonData = () => {
    const exportObj = { ...BASE_LECTURES, ...customLectures };
    if (Object.keys(exportObj).length === 0) {
      showToastMsg("Nothing to export yet — import some lectures first", "err");
      return;
    }
    const dataStr = JSON.stringify(exportObj, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lectures.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToastMsg("Downloaded lectures.json — replace src/data/lectures.json with it", "ok");
  };

  const openAskAi = (prompt) => {
    setAiPrompt(prompt);
    setShowAiModal(true);
  };
  const askAI = async (prompt, appUrl) => {
    try {
      await navigator.clipboard.writeText(prompt);
      showToastMsg("Prompt copied! I-paste na lang sa AI app", "ok");
    } catch (err) {
      showToastMsg("Hindi ma-copy ang prompt — subukan ulit", "err");
    }
    window.open(appUrl, "_blank");
  };

  // Styles
  const styles = {
    page: { minHeight: "100vh", background: T.bg, fontFamily: T.bodyFont, color: T.text, padding: "0 0 52px" },
    wrap: { maxWidth: 900, margin: "0 auto", padding: "24px 16px" },
    card: { background: T.surface, borderRadius: 20, padding: 24, border: `1px solid ${T.surfaceBorder}`, backdropFilter: "blur(12px)", color: T.text },
    cardSm: { background: T.surface, borderRadius: 14, padding: "13px 16px", border: `1px solid ${T.surfaceBorder}`, color: T.text },
    btn: (bg, c = T.text) => ({ cursor: "pointer", border: "none", borderRadius: 12, padding: "11px 18px", background: bg, color: c, fontWeight: 700, fontFamily: T.bodyFont, fontSize: 14, transition: "all .15s", display: "inline-flex", alignItems: "center", gap: 6, flex: 1, justifyContent: "center" })
  };

  const filteredCategories = Object.entries(customCategories).filter(([cid, cat]) => {
    const haystack = [...(cat.level1 || cat.items || []), ...(cat.level2 || [])];
    return cat.label.toLowerCase().includes(searchTerm.toLowerCase()) || haystack.some(q => q.q.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <div style={styles.page}>
      <style>{`
        @import url('${T.gFonts}');
        *{box-sizing:border-box;margin:0;padding:0}
        button:hover:not(:disabled){opacity:.87;transform:translateY(-1px)}
        button:active:not(:disabled){transform:scale(.97)}
        .cBtn{width:100%;text-align:left;padding:13px 17px;border-radius:14px;border:1.5px solid ${T.surfaceBorder};background:${T.surface};color:${T.text};font-size:14px;font-family:${T.bodyFont};font-weight:600;cursor:pointer;transition:all .15s;margin-bottom:8px;display:flex;align-items:flex-start;gap:12px;line-height:1.5}
        .cBtn:not(:disabled):hover{border-color:${T.accent};background:${T.surfaceHover}}
        .cBtn.correct{border-color:${T.success}!important;background:${T.successBg}!important;color:${T.successText}!important}
        .cBtn.wrong{border-color:${T.danger}!important;background:${T.dangerBg}!important;color:${T.dangerText}!important}
        @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .fu{animation:fu .28s ease}
        input, select, textarea { background: ${T.inputBg}; border: 1px solid ${T.inputBorder}; color: ${T.text}; padding: 8px 12px; border-radius: 8px; }
        .modal-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: ${T.modalBg}; border-radius: 24px; padding: 24px; max-width: 500px; width: 90%; max-height: 80vh; overflow: auto; border: 1px solid ${T.surfaceBorder}; color: ${T.text}; }
      `}</style>

      {isOffline && (
        <div style={{ position: "fixed", top: 3, left: "5%", transform: "translateX(-50%)", zIndex: 7000, padding: "5px 10px", borderRadius: 888, background: T.dangerBg, color: T.dangerText, border: `1px solid ${T.dangerBorder}`, fontSize: 7, fontWeight: 700, whiteSpace: "nowrap" }}>
          📴 Offline mode
        </div>
      )}

      {toast && <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", padding: "11px 22px", borderRadius: 12, background: toast.type === "err" ? T.dangerBg : T.successBg, color: toast.type === "err" ? T.dangerText : T.successText, border: `1px solid ${toast.type === "err" ? T.dangerBorder : T.successBorder}`, fontWeight: 700, zIndex: 999, whiteSpace: "nowrap" }}>{toast.msg}</div>}

      {/* Top Nav */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, padding: "12px 20px", background: T.surface, borderBottom: `1px solid ${T.surfaceBorder}` }}>
        <button style={styles.btn(screen === "home" || screen === "quiz" || screen === "manage" || screen === "results" ? T.accentGrad : T.surface, screen === "home" || screen === "quiz" || screen === "manage" || screen === "results" ? "#fff" : T.textSub)} onClick={() => setScreen("home")}>📝 Quiz</button>
        <button style={styles.btn(screen === "study" ? T.accentGrad : T.surface, screen === "study" ? "#fff" : T.textSub)} onClick={() => { setScreen("study"); setStudySubject(null); }}>📖 Study</button>
        <button style={styles.btn(screen === "settings" || screen === "profile" ? T.accentGrad : T.surface, screen === "settings" || screen === "profile" ? "#fff" : T.textSub)} onClick={() => setScreen("settings")}>⚙️ Settings</button>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={styles.wrap}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h1 style={{ fontFamily: T.headFont, fontSize: 24, color: T.text, marginBottom: 8 }}>🎯 Start Quiz, goodluck babe😚</h1>
            <p style={{ color: T.textSub, fontSize: 13 }}>Pumili ng subject at piliin ang Level 1 o Level 2 o ako?</p>
            <button style={{ ...styles.btn(T.surface, T.text), marginTop: 14, maxWidth: 210 }} onClick={() => setScreen("manage")}>✏️ Manage Quiz Subjects</button>
            {quizProgress && <><br/><button style={{ ...styles.btn(T.accentGrad, "#fff"), marginTop: 10, maxWidth: 210 }} onClick={resumeQuiz}>▶️ Resume Previous Quiz</button></>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
            {Object.entries(allCategories).map(([cid, cat]) => (
              <div key={cid} style={{ ...styles.cardSm, border: `1.5px solid ${cat.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 22 }}>{cat.icon}</span>
                  <div><h3 style={{ fontSize: 15, color: cat.color }}>{cat.label}</h3><p style={{ fontSize: 11, color: T.textMuted }}>L1: {(cat.level1 || []).length} Qs · L2: {(cat.level2 || []).length} Qs</p></div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{ ...styles.btn(T.accentGrad, "#fff"), flex: 1, padding: "7px 8px", fontSize: 12 }} onClick={() => startQuiz(cid, 1, true)}>📝 Level 1 (MC)</button>
                  <button style={{ ...styles.btn(T.surface, T.text), flex: 1, padding: "7px 8px", fontSize: 12, border: `1px solid ${T.surfaceBorder}` }} onClick={() => startQuiz(cid, 2, true)}>✍️ Level 2 (Identification)</button>
                </div>
                <button style={{ ...styles.btn(T.surface, T.text), width: "100%", marginTop: 6, padding: "6px 8px", fontSize: 11 }} onClick={() => startQuiz(cid, 1, false)}>🚀 L1 No Timer</button>
                <button style={{ ...styles.btn(T.surface, T.text), width: "100%", marginTop: 6, padding: "6px 8px", fontSize: 11 }} onClick={() => startQuiz(cid, 2, false)}>🚀 L2 No Timer</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && quizQuestions.length > 0 && (
        <div style={styles.wrap} className="fu">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 8 }}>
            <button style={{ ...styles.btn(T.surface), flex: 0 }} onClick={() => { saveProgress(); setScreen("home"); }}>🏠 Exit & Save</button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
              {timeLeft !== null && <span style={{ fontWeight: 800, color: T.dangerText }}>⏱️ {timeLeft}s</span>}
              <span style={{ fontWeight: 800, color: T.accent }}>{studyMode ? "Study Mode" : `Score: ${quizScore}`}</span>
              <button style={{ ...styles.btn(T.surface), flex: 0 }} onClick={toggleFlag}>🚩 {flaggedSet.has(quizQuestions[currentIndex].id) ? "Flagged" : "Flag"}</button>
            </div>
          </div>
          <div style={{ height: 5, background: T.progressBg, borderRadius: 3, marginBottom: 12 }}><div style={{ height: "100%", width: `${((currentIndex + 1) / quizQuestions.length) * 100}%`, background: T.accentGrad, borderRadius: 3 }} /></div>
          <p style={{ textAlign: "center", marginBottom: 10, color: T.textSub, fontSize: 12 }}>{quizQuestions[currentIndex]?.catLabel} · Level {quizLevel} ({quizLevel === 1 ? "Multiple Choice" : "Identification"}) · Q{currentIndex + 1}/{quizQuestions.length}</p>
          <div style={styles.card}><p style={{ fontWeight: 800, fontSize: 16, lineHeight: 1.5 }}>{renderQuestionText(quizQuestions[currentIndex].q, T.text)}</p></div>

          {quizLevel === 1 && <div style={{ marginTop: 12 }}>
            {(quizQuestions[currentIndex].choices || []).map((ch, idx) => {
              let cls = "cBtn";
              if (isAnswered) { if (idx === quizQuestions[currentIndex].ans) cls += " correct"; else if (idx === selectedChoice) cls += " wrong"; }
              return <button key={idx} className={cls} disabled={isAnswered} onClick={() => handleAnswerLevel1(idx)}><span style={{ opacity: .7 }}>{String.fromCharCode(65 + idx)}.</span><span>{ch}</span></button>;
            })}
          </div>}

          {quizLevel === 2 && <div style={{ marginTop: 12 }}>
            <input type="text" placeholder="I-type ang iyong sagot dito..." value={textInputAnswer} onChange={e => setTextInputAnswer(e.target.value)} onKeyDown={e => e.key === "Enter" && !isAnswered && handleAnswerLevel2()} disabled={isAnswered} style={{ width: "100%", padding: 11, fontSize: 14, borderRadius: 10, border: `1.5px solid ${isAnswered ? (isCorrectAnswer ? T.success : T.danger) : T.inputBorder}` }} />
            {!isAnswered && <button style={{ ...styles.btn(T.accentGrad, "#fff"), width: "100%", marginTop: 8, padding: 10 }} onClick={handleAnswerLevel2}>Submit Answer</button>}
          </div>}

          {isAnswered && <div className="fu" style={{ ...styles.card, background: isCorrectAnswer ? T.successBg : T.dangerBg, marginTop: 12, padding: 14 }}>
            <p style={{ fontWeight: 800, color: isCorrectAnswer ? T.successText : T.dangerText }}>{isCorrectAnswer ? "✅ Tama ka naman palagi!" : "❌ Mali, kasi ako dapat!🙄"}</p>
            {quizLevel === 2 && !isCorrectAnswer && <p style={{ fontSize: 13, marginTop: 3 }}>Tamang Sagot: <strong>{quizQuestions[currentIndex]?.answer}</strong></p>}
            {quizQuestions[currentIndex]?.exp && <p style={{ fontSize: 13, marginTop: 5 }}>{quizQuestions[currentIndex].exp}</p>}
          </div>}
          {isAnswered && <div style={{ display: "flex" }}><button style={{ ...styles.btn(T.accentGrad, "#fff"), marginTop: 12 }} onClick={nextQuestion}>{currentIndex + 1 === quizQuestions.length ? "Finish" : "Next →"}</button></div>}
        </div>
      )}

      {/* RESULTS */}
      {screen === "results" && (
        <div style={styles.wrap} className="fu">
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <h2 style={{ color: T.text }}>🎉 Results</h2>
            {!studyMode && <div style={{ fontSize: 44, fontWeight: 800, color: T.accent }}>{Math.round((quizScore / quizQuestions.length) * 100)}%</div>}
            <p style={{ color: T.textSub }}>{studyMode ? "Study mode completed" : `${quizScore} / ${quizQuestions.length} correct, dahil jan may +5 points ka sakin😉`}</p>
            {flaggedSet.size > 0 && <button style={{ ...styles.btn(T.accent, "#fff"), marginTop: 10, maxWidth: 220 }} onClick={() => setShowFlaggedOnly(!showFlaggedOnly)}>{showFlaggedOnly ? "Show All" : `Review Flagged (${flaggedSet.size})`}</button>}
          </div>
          {(showFlaggedOnly ? quizHistoryDetails.filter(d => flaggedSet.has(d.q.id)) : quizHistoryDetails).filter(d => !d.correct).map((detail, idx) => (
            <div key={idx} style={{ ...styles.cardSm, marginTop: 10 }}>
              <p><strong>{detail.q.q}</strong></p>
              {detail.level === 1 ? <><p style={{ color: T.dangerText }}>Your answer: {detail.selected >= 0 ? detail.q.choices?.[detail.selected] : "(No Answer - Time Out)"}</p><p style={{ color: T.successText }}>Correct: {detail.q.choices?.[detail.q.ans]}</p></> : <><p style={{ color: T.dangerText }}>Your answer: {detail.userText}</p><p style={{ color: T.successText }}>Correct: {detail.q.answer}</p></>}
              {detail.q.exp && <p style={{ fontSize: 12 }}>{detail.q.exp}</p>}
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}><button style={{ ...styles.btn(T.accentGrad, "#fff"), maxWidth: 250 }} onClick={() => setScreen("home")}>🏠 Back to Home</button></div>
        </div>
      )}

      {/* STUDY */}
      {screen === "study" && (
        <div style={styles.wrap}>
          {!studySubject && (
            <>
              <h2 style={{ marginBottom: 16, color: T.text }}>📖 Study Subjects</h2>
              {Object.keys(allLectures).length === 0 && (
                <p style={{ color: T.textMuted }}>Wala pang subject lecture. I-import muna sa Settings.</p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {Object.entries(allLectures).map(([sid, subj]) => (
                  <div
                    key={sid}
                    style={{ ...styles.card, width: 150, cursor: "pointer", textAlign: "center" }}
                    onClick={() => setStudySubject(sid)}
                  >
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{subj.icon || "📌"}</div>
                    <div style={{ fontWeight: 800, color: T.text }}>{subj.label}</div>
                    <div style={{ fontSize: 12, color: T.textSub, marginTop: 4 }}>
                      {(subj.chapters || []).length} chapter{(subj.chapters || []).length === 1 ? "" : "s"}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {studySubject && (
            <>
              <h2 style={{ marginBottom: 16, color: T.text }}>{allLectures[studySubject]?.icon} {allLectures[studySubject]?.label}</h2>
              {(allLectures[studySubject]?.chapters || []).length === 0 && (
                <p style={{ color: T.textMuted }}>Wala pang laman dito.</p>
              )}
              {(allLectures[studySubject]?.chapters || []).map((ch) => (
                <div key={ch.id} style={{ marginBottom: 28 }}>
                  <h3 style={{ color: T.text, marginBottom: 10 }}>{ch.title}</h3>
                  {ch.content.split(/\n\s*\n/).filter(p => p.trim()).map((para, pIdx) => (
                    <div key={pIdx} style={{ ...styles.card, marginBottom: 10 }}>
                      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7, color: T.text, marginBottom: 10 }}>{para.trim()}</p>
                      <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        {ch.askAi?.enabled !== false && (
                          <button
                            style={{ ...styles.btn(T.surface), flex: 0 }}
                            onClick={() => {
                              // Use the prompt explicitly supplied by the Study JSON.
                              // If no custom prompt exists, preserve the original automatic behavior.
                              const prompt = ch.askAi?.context?.trim()
                                ? ch.askAi.context
                                : buildParagraphPrompt(
                                    para.trim(),
                                    ch.title,
                                    allLectures[studySubject]?.label
                                  );

                              openAskAi(prompt);
                            }}
                          >
                            🤖 Ask Osias v6.7 AI
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ display: "flex" }}>
                <button style={{ ...styles.btn(T.surface), marginTop: 8, maxWidth: 200 }} onClick={() => setStudySubject(null)}>← Back to Subjects</button>
              </div>
            </>
          )}
        </div>
      )}

      {screen === "profile" && (
        <div style={styles.wrap}>
          <h2 style={{ marginBottom: 16, color: T.text }}>👤 Profile</h2>
          <input style={{ ...styles.cardSm, width: "100%", marginBottom: 20 }} value={userName} onChange={e => setUserName(e.target.value)} placeholder="Your Name" />
          <h3 style={{ color: T.text }}>📊 Performance Analytics</h3>
          {userHistory.length === 0 && <p style={{ color: T.textMuted }}>No quizzes taken yet.</p>}
          {userHistory.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <p>Total quizzes: {userHistory.length}</p>
              <p>Best score: {Math.max(...userHistory.map(h => h.percent))}%</p>
              <p>Average score: {Math.round(userHistory.reduce((a,b)=>a+b.percent,0)/userHistory.length)}%</p>
              <div style={{ marginTop: 16 }}>
                <h4>Accuracy by subject</h4>
                {Object.entries(getCategoryStats()).map(([catId, stat]) => {
                  const cat = allCategories[catId];
                  if (!cat) return null;
                  const pct = Math.round((stat.correct / stat.total) * 100);
                  return (
                    <div key={catId} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>{cat.icon} {cat.label}</span>
                        <span>{pct}%</span>
                      </div>
                      <div style={{ height: 6, background: T.progressBg, borderRadius: 3 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: cat.color, borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div style={{ display: "flex" }}>
            <button style={{ ...styles.btn(T.surface), marginTop: 16, maxWidth: 150 }} onClick={() => setScreen("settings")}>← Back</button>
          </div>
        </div>
      )}

      {/* SETTINGS */}
      {screen === "settings" && (
        <div style={styles.wrap}>
          <h2 style={{ color: T.text }}>⚙️ Settings</h2>
          <div style={{ marginTop: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <input type="checkbox" checked={settings.randomizeChoices} onChange={e => setSettings({ ...settings, randomizeChoices: e.target.checked })} />
              Randomize answer order
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <input type="checkbox" checked={studyMode} onChange={e => { setStudyMode(e.target.checked); setSettings({ ...settings, studyMode: e.target.checked }); }} />
              Study Mode (no score, instant feedback)
            </label>
          </div>
          <div style={{ ...styles.card, marginTop: 20 }}>
            <h3 style={{ color: T.text }}>📱 Offline & Device Storage</h3>
            <p style={{ fontSize: 12, color: T.textSub, marginTop: 6, lineHeight: 1.5 }}>
              After the app has been opened online once, the website can continue working without internet. Your manually added Custom Subjects and Questions are stored separately in this device's local storage, so new built-in quiz/study content added by the project will not clear them. kaya mag thank you ka sakin or kahit mag hi kalang in person.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
              <span style={{ ...styles.btn(isOffline ? T.dangerBg : T.successBg, isOffline ? T.dangerText : T.successText), cursor: "default" }}>
                {isOffline ? "📴 Offline" : "🟢 Online"}
              </span>
              {installPrompt && !isInstalled && (
                <button style={styles.btn(T.accentGrad, "#fff")} onClick={installApp}>📲 Install App</button>
              )}
              {isInstalled && <span style={{ ...styles.btn(T.surface, T.text), cursor: "default" }}>✅ Installed</span>}
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
            {Object.entries(THEMES).map(([k, th]) => (
              <button key={k} style={{ ...styles.btn(theme === k ? T.accentGrad : T.surface) }} onClick={() => setTheme(k)}>{th.icon} {th.name}</button>
            ))}
          </div>

          <div style={{ display: "flex", marginTop: 24 }}>
            <button style={{ ...styles.btn(T.surface) }} onClick={() => setScreen("profile")}>👤 View Profile & Analytics</button>
          </div>

          {/* DEV PANEL */}
          {!devUnlocked && (
            <div style={{ ...styles.card, marginTop: 24, textAlign: "left" }}>
              <h3 style={{ color: T.text }}>🛠️ Manage App Data</h3>
              <p style={{ fontSize: 12, color: T.textSub, margin: "6px 0 14px" }}>Protektado ito ng password.</p>
              <div style={{ display: "flex" }}>
                <button
                  style={{ ...styles.btn(T.accentGrad, "#fff"), maxWidth: 300 }}
                  onClick={() => {
                    const pw = window.prompt("Enter developer password:");
                    if (pw === "osiasnalaunan") {
                      setDevUnlocked(true);
                    } else if (pw !== null) {
                      showToastMsg("Wrong password", "err");
                    }
                  }}
                >
                  🔓 Unlock Data Manager
                </button>
              </div>
            </div>
          )}

          {devUnlocked && (
            <div style={{ ...styles.card, marginTop: 24, textAlign: "left" }}>
              <h3 style={{ color: T.text }}>🛠️ Data Manager</h3>
              
              <h4 style={{ color: T.text, marginTop: 16 }}>🗑️ Delete Imported Content</h4>
              <p style={{ fontSize: 12, color: T.textSub, margin: "6px 0 14px" }}>Manage what you've imported into the app.</p>
              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 13, color: T.text, marginBottom: 4 }}>Imported Subjects (Questions):</p>
                {Object.keys(customCategories).length === 0 && <p style={{ fontSize: 12, color: T.textSub }}>No imported subjects.</p>}
                {Object.entries(customCategories).map(([id, c]) => (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: T.surfaceHover, borderRadius: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 14 }}>{c.icon} {c.label}</span>
                    <button style={{ background: 'transparent', border: 'none', color: T.dangerText, cursor: 'pointer', fontWeight: 600 }} onClick={() => deleteCategory(id)}>Delete</button>
                  </div>
                ))}

                <p style={{ fontSize: 13, color: T.text, marginTop: 12, marginBottom: 4 }}>Imported Lectures:</p>
                {Object.keys(customLectures).length === 0 && <p style={{ fontSize: 12, color: T.textSub }}>No imported lectures.</p>}
                {Object.entries(customLectures).map(([id, l]) => (
                  <div key={id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: T.surfaceHover, borderRadius: 6, marginBottom: 4 }}>
                    <span style={{ fontSize: 14 }}>{l.icon} {l.label}</span>
                    <button style={{ background: 'transparent', border: 'none', color: T.dangerText, cursor: 'pointer', fontWeight: 600 }} onClick={() => deleteLecture(id)}>Delete</button>
                  </div>
                ))}
              </div>

              <hr style={{ border: `1px solid ${T.surfaceBorder}`, margin: "24px 0" }} />

              <h4 style={{ color: T.text, marginTop: 8 }}>📝 Import Quiz Questions</h4>
              <p style={{ fontSize: 12, color: T.textSub, margin: "6px 0 14px" }}>
                Import questions by subject using JSON.
              </p>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: T.textSub }}>Upload a .json file</label><br />
                <input type="file" accept=".json,application/json" onChange={handleDevFileUpload} />
              </div>
              <textarea
                rows={4}
                style={{ width: "100%", fontFamily: "monospace", fontSize: 12 }}
                placeholder={'{\n  "id": "biology",\n  "label": "Biology",\n  "level1": [{ "q": "Question", "choices": ["A","B","C","D"], "ans": 0, "exp": "Explanation" }],\n  "level2": [{ "q": "Identify...", "answer": "Correct Answer", "exp": "Explanation" }]\n}'}
                value={devJsonInput}
                onChange={e => setDevJsonInput(e.target.value)}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                <button style={styles.btn(T.accentGrad, "#fff")} onClick={importJsonData}>📥 Import JSON</button>
                <button style={styles.btn(T.surface)} onClick={exportJsonData}>⬇️ Export All to File</button>
              </div>

              <h4 style={{ color: T.text, marginTop: 24 }}>📖 Import Study Lectures</h4>
              <p style={{ fontSize: 12, color: T.textSub, margin: "6px 0 14px", lineHeight: 1.5 }}>
                Import Study-only lectures using JSON. You can include an optional <code>askAi</code> object inside each chapter. Its <code>context</code> will be copied and used when the Study chapter's Ask AI button is opened.
              </p>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: T.textSub }}>Upload a .json file</label><br />
                <input type="file" accept=".json,application/json" onChange={handleDevLectureFileUpload} />
              </div>
              <textarea
                rows={4}
                style={{ width: "100%", fontFamily: "monospace", fontSize: 12 }}
                placeholder={'{\n  "id": "history",\n  "label": "Philippine History",\n  "icon": "📜",\n  "color": "#E8187A",\n  "chapters": [\n    {\n      "id": "ch1",\n      "title": "Pre-colonial Period",\n      "content": "Lecture text here...",\n      "askAi": {\n        "enabled": true,\n        "context": "Explain this lesson clearly using the lecture content as the primary context."\n      }\n    }\n  ]\n}'}
                value={devLectureJsonInput}
                onChange={e => setDevLectureJsonInput(e.target.value)}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                <button style={styles.btn(T.accentGrad, "#fff")} onClick={importLectureJsonData}>📥 Import JSON</button>
                <button style={styles.btn(T.surface)} onClick={exportLectureJsonData}>⬇️ Export All to File</button>
              </div>

              <div style={{ display: "flex", marginTop: 24 }}>
                <button style={{ ...styles.btn(T.surface), maxWidth: 200 }} onClick={() => setDevUnlocked(false)}>🔒 Lock Manager</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MANAGE */}
      {screen === "manage" && (
        <div style={styles.wrap}>
          <h2 style={{ color: T.text, marginBottom: 8 }}>✏️ Manage Custom Subjects</h2>
          <input type="text" placeholder="Search subjects or questions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ width: "100%", marginBottom: 12 }} />
          <button style={{ ...styles.btn(T.accentGrad, "#fff"), flex: 0, marginBottom: 12 }} onClick={openAddCategory}>+ Add New Subject</button>
          {filteredCategories.map(([cid, cat]) => {
            const l1 = cat.level1 || cat.items || [];
            const l2 = cat.level2 || [];
            const filter = q => q.q.toLowerCase().includes(searchTerm.toLowerCase());
            return <div key={cid} style={{ ...styles.card, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <h3 style={{ color: cat.color }}>{cat.icon} {cat.label}</h3>
                <div style={{ display: "flex", gap: 6 }}><button style={{ ...styles.btn(T.surface), flex: 0, padding: "6px 9px", fontSize: 11 }} onClick={() => openEditCategory(cid)}>✏️ Edit</button><button style={{ ...styles.btn(T.dangerBg, T.dangerText), flex: 0, padding: "6px 9px", fontSize: 11 }} onClick={() => deleteCategory(cid)}>🗑️ Delete</button></div>
              </div>
              <div style={{ marginTop: 10, padding: 8, background: T.surfaceHover, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 700 }}>Level 1 (Multiple Choice) · {l1.length} Qs</span><button style={{ ...styles.btn(T.surface, T.text), flex: 0, padding: "5px 8px", fontSize: 11 }} onClick={() => openAddQuestion(cid, 1)}>+ Add L1</button></div>
                {l1.filter(filter).map(q => <div key={q.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 5, fontSize: 12 }}><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.q}</span><span style={{ whiteSpace: "nowrap" }}><button style={{ background: "transparent", border: 0, color: T.accent, cursor: "pointer" }} onClick={() => openEditQuestion(cid, q, 1)}>Edit</button> <button style={{ background: "transparent", border: 0, color: T.dangerText, cursor: "pointer" }} onClick={() => deleteQuestion(cid, q.id, 1)}>Del</button></span></div>)}
              </div>
              <div style={{ marginTop: 8, padding: 8, background: T.surfaceHover, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 700 }}>Level 2 (Identification) · {l2.length} Qs</span><button style={{ ...styles.btn(T.surface, T.text), flex: 0, padding: "5px 8px", fontSize: 11 }} onClick={() => openAddQuestion(cid, 2)}>+ Add L2</button></div>
                {l2.filter(filter).map(q => <div key={q.id} style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 5, fontSize: 12 }}><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.q}</span><span style={{ whiteSpace: "nowrap" }}><button style={{ background: "transparent", border: 0, color: T.accent, cursor: "pointer" }} onClick={() => openEditQuestion(cid, q, 2)}>Edit</button> <button style={{ background: "transparent", border: 0, color: T.dangerText, cursor: "pointer" }} onClick={() => deleteQuestion(cid, q.id, 2)}>Del</button></span></div>)}
              </div>
            </div>;
          })}
          <button style={{ ...styles.btn(T.surface), maxWidth: 150 }} onClick={() => setScreen("home")}>← Back</button>
        </div>
      )}

      {/* MODALS */}
      {showAiModal && (
        <div className="modal-overlay" onClick={() => setShowAiModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 style={{ color: T.text, marginBottom: 12 }}>🤖 Ask AI</h3>
            <p style={{ fontSize: 12, color: T.textSub, marginBottom: 16 }}>Pipiliin mo ang AI app — kokopyahin ang prompt at bubuksan ang app, i-paste mo na lang.</p>
            {AI_APPS.map(app => (
              <button
                key={app.id}
                className="cBtn"
                onClick={() => { askAI(aiPrompt, app.url); setShowAiModal(false); }}
              >
                <span>{app.icon}</span><span>{app.label}</span>
              </button>
            ))}
            <div style={{ display: "flex", marginTop: 12 }}>
              <button style={{ ...styles.btn(T.surface) }} onClick={() => setShowAiModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showCatModal && (
        <div className="modal-overlay" onClick={() => setShowCatModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editingCatId ? "Edit Subject" : "New Subject"}</h3>
            <div style={{ marginBottom: 12, marginTop: 12 }}>
              <label>Subject ID (unique, no spaces)</label>
              <input type="text" value={catForm.id} onChange={e => setCatForm({ ...catForm, id: e.target.value })} disabled={!!editingCatId} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Label</label>
              <input type="text" value={catForm.label} onChange={e => setCatForm({ ...catForm, label: e.target.value })} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Icon (emoji)</label>
              <input type="text" value={catForm.icon} onChange={e => setCatForm({ ...catForm, icon: e.target.value })} style={{ width: "100%" }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label>Color</label>
              <input type="color" value={catForm.color} onChange={e => setCatForm({ ...catForm, color: e.target.value })} style={{ width: "100%" }} />
              <div style={{ background: catForm.color, height: 30, borderRadius: 8, marginTop: 8 }} />
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button style={styles.btn(T.surface)} onClick={() => setShowCatModal(false)}>Cancel</button>
              <button style={styles.btn(T.accentGrad, "#fff")} onClick={saveCategory}>Save</button>
            </div>
          </div>
        </div>
      )}
      {showQuestionModal && (
        <div className="modal-overlay" onClick={() => setShowQuestionModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <h3>{editingQuestion ? "Edit Question" : "New Question"} · Level {questionModalLevel}</h3>
            {questionModalLevel === 1 ? <>
              <div style={{ margin: "10px 0" }}><label>Question</label><textarea value={questionForm.q} onChange={e => setQuestionForm({ ...questionForm, q: e.target.value })} rows={2} style={{ width: "100%" }} /></div>
              {[0,1,2,3].map(i => <div key={i} style={{ marginBottom: 7 }}><label>Choice {String.fromCharCode(65+i)}</label><input value={questionForm.choices[i]} onChange={e => { const choices=[...questionForm.choices]; choices[i]=e.target.value; setQuestionForm({ ...questionForm, choices }); }} style={{ width: "100%" }} /></div>)}
              <div style={{ margin: "8px 0" }}><label>Correct Choice Index (0=A, 1=B, 2=C, 3=D)</label><input type="number" min="0" max="3" value={questionForm.ans} onChange={e => setQuestionForm({ ...questionForm, ans: Math.max(0, Math.min(3, parseInt(e.target.value) || 0)) })} style={{ width: "100%" }} /></div>
              <div style={{ margin: "8px 0" }}><label>Explanation</label><textarea value={questionForm.exp} onChange={e => setQuestionForm({ ...questionForm, exp: e.target.value })} rows={2} style={{ width: "100%" }} /></div>
            </> : <>
              <div style={{ margin: "10px 0" }}><label>Question</label><textarea value={questionFormL2.q} onChange={e => setQuestionFormL2({ ...questionFormL2, q: e.target.value })} rows={2} style={{ width: "100%" }} /></div>
              <div style={{ margin: "10px 0" }}><label>Correct Answer (Identification)</label><input value={questionFormL2.answer} onChange={e => setQuestionFormL2({ ...questionFormL2, answer: e.target.value })} style={{ width: "100%" }} /></div>
              <div style={{ margin: "8px 0" }}><label>Explanation</label><textarea value={questionFormL2.exp} onChange={e => setQuestionFormL2({ ...questionFormL2, exp: e.target.value })} rows={2} style={{ width: "100%" }} /></div>
            </>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 12 }}><button style={styles.btn(T.surface)} onClick={() => setShowQuestionModal(false)}>Cancel</button><button style={styles.btn(T.accentGrad, "#fff")} onClick={saveQuestion}>Save</button></div>
          </div>
        </div>
      )}
    </div>
  );
}```

## File: ./src/assets/react.svg
```
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>```

## File: ./src/assets/vite.svg
```
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
```

## File: ./src/index.css
```
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}
```

## File: ./src/main.jsx
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: ./vite.config.js
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

