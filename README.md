# CDNからgrapesjsを読み込む＋アンビエント宣言で型を定義する最低限のサンプル

型定義が欲しいのでnpmでインストールを行う(CDNからjs本体を読み込むのでjsは利用しない)
```
npm init -y
npm i grapesjs
```

global.d.tsを作成し、アンビエント宣言でnpmから型を読み込む

```ts:global.d.ts
declare var grapesjs: typeof import('grapesjs').grapesjs;
```

