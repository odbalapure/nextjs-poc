import { useRouter } from "next/router";

// The [] tells NextJS that its a dynamic page
// Should be loaded for different values in the path
function NewsId() {
  // The router object
  /* 
    {pathname: '/news/[id]', route: '/news/[id]', query: {…}, asPath: '/news/1', components: {…}, …}
    asPath: "/news/1"
    back: ƒ ()
    basePath: ""
    beforePopState: ƒ ()
    components: {/news/[id]: {…}, /_app: {…}}
    defaultLocale: undefined
    domainLocales: undefined
    events: {on: ƒ, off: ƒ, emit: ƒ}
    isFallback: false
    isLocaleDomain: false
    isPreview: false
    isReady: true
    locale: undefined
    locales: undefined
    pathname: "/news/[id]"
    prefetch: ƒ ()
    push: ƒ ()
    query: {id: '1'}
    reload: ƒ ()
    replace: ƒ ()
    route: "/news/[id]"
    [[Prototype]]: Object 
  */
  const router = useRouter();
  // NOTE: We used "id" because it was the name of the dynamic page
  const newsId = router.query.id;

  return (
    <div>
      <h1>The news id: {newsId}</h1>
    </div>
  );
}

export default NewsId;