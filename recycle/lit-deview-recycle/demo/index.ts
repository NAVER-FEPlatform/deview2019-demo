import { html } from "lit-element";
import { render } from "lit-html";
import "../src/LitDeviewRecycle";

const container = document.querySelector(".container");
let items = [0, 1, 2, 3];
let start = 0;
let end = 0;

function onAppend() {
    items = [...items, items.length];

    renderRecycle();
}
function onVisibleChange(e) {
    start = e.detail.start;
    end = e.detail.end;

    renderRecycle();
}
function renderItem(item) {
    return html`<div class="item">${item}</div>`;
}
function renderRecycle() {
    render(html`
<style>
html {
    position: relative;
    height: 100%;
}
body {
    margin: 0;
    padding: 0;
}
p,
span,
a {
    padding: 0;
    margin: 0;
}
header {
    position: relative;
    width: 100%;
    height: 300px;
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
    text-align: center;
    background: url(https://deview.kr/2019/img/t_main_spot.jpg) no-repeat;
    background-size: 100% auto;
    background-position: center center;
}
@media screen and (max-width: 420px) {
    header {
        background-size: auto 100%;
    }
}
header p {
    position: absolute;
    width: 100%;
    max-width: 420px;
    padding: 10px;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.list {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    z-index: 10;
}
.container {
    position: relative;
    display: block;
}
.shuffle {
    width: 100%;
    height: 40px;
    font-weight: bold;
    margin: 5px 0px;
    box-shadow: none;
    border: 1px solid #ddd;
    background: #eee;
    box-sizing: border-box;
    font-size: 15px;
}
.item {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ddd;
    width: 100%;
}
</style>
<header>
    <p>
        DEVIEW 2019
        <br />
        Cross Framework Component
        <br />
        Lit Recycle Demo
    </p>
</header>
<div class="list">
  items: <span class="items" >${items.join(", ")}</span><br/>
  visible: <span class="items" >{ start: ${start}, end: ${end} }</span>
</div>
<lit-deview-recycle
    class="container"
    .items=${items}
    .template=${renderItem}
    .css=${html`
<style>
.item {
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #ddd;
    width: 100%;
}
</style>
    `}
    .options=${{
        margin: 5,
    }}
    @append="${onAppend}"
    @visibleChange="${onVisibleChange}"
    >
</lit-deview-recycle>
    `, container);
}

renderRecycle();
