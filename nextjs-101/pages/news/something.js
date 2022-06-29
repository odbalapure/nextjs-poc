// This will create a nested component, the issue here is that
// the page is not dynamic. For that you need to create a page with "[]" syntax
// Eg: [id].js
const details = () => {
  return (
    <div>
      <h1>Nested Page (Static Page)</h1>
    </div>
  );
}

export default details;