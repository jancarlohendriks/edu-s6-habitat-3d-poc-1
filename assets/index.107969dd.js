import{G as h,S as w,A as y,W as b,a as g,P as L,b as v,c as A,d as S}from"./vendor.8a003558.js";const N=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}};N();var P="/assets/model-12.8b974f30.glb",r,c,u,t=0;const C=new h(10,10),f=Stats();document.body.appendChild(f.dom);var s=new w;s.add(new y(5));s.add(C);const l=new b;l.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(l.domElement);const G=new g;G.load(P,function(n){n.scene.children.find(e=>e.name=="Cube"),n.scene.children.find(e=>e.name=="NurbsPath"),console.log(n.animations),r=n.cameras[0];const i=new L;i.position.set(2.5,7.5,15);const a=new v;a.position.set(2.5,7.5,15);const d=A.findByName(n.animations,"Action");c=new S(r),u=c.clipAction(d),u.play(),s.add(n.scene,a,i),l.render(s,r)},n=>console.log(n.loaded/n.total*100+"% loaded"),n=>console.log(n));function p(){requestAnimationFrame(p),c&&c.setTime(t),r&&l.render(s,r),f.update()}p();window.addEventListener("wheel",H,!1);function H(n){t>.1&&n.deltaY<0&&(t=t-.1),t<4.1&&n.deltaY>0&&(t=t+.1)}
