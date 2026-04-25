## The issue i encounter which bring me to this position that i design `getActiveSession` function

The middleware strategy for refreshing token went well in all case.

but i exprienced wiered behaviour in such a way that some server components turn into un-logged mode mean that display unauthorized error.

after some search, i find out it is about next.js rebuild mechanism which it build project after some interval and update page.

in that case the middleware not called so it uses old `auth()` session and if short-live token get expired then it build and render in unauthorized state.

so I came with `getActiveSession` to bring the middleware session handling functionality to all session accessing.
