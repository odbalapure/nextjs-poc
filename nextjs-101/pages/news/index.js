// You don't need to use React router to create pages
// Just create some files under "pages/" folder
// To access that page (say news.js) just use the file name, eg: http://localhost:3000/news
// This is called as "file based routing"
const news = () => {
  return (
    <div>
      <h1>News Page</h1>
    </div>
  );
}

export default news;