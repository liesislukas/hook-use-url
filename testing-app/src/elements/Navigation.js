import useUrl from "../hooks/useUrl";

export default function Navigation() {
  const url = useUrl();

  const tags = url.get("tag");

  return (
    <div>
      <div>getProtocol: {url.getProtocol()}</div>
      <div>getDomain: {url.getDomain()}</div>
      <div>getDomainWithPort: {url.getDomainWithPort()}</div>
      <div>getPort: {url.getPort()}</div>
      <div>getPath: {url.getPath()}</div>
      <div>getQuery: {url.getQuery()}</div>
      <div>_a getUri: {_a.getUri()}</div>
      <div>_b getUri: {_b.getUri()}</div>
      <div>_c getUri: {_c.getUri()}</div>
      <div>getFragment: {url.getFragment()}</div>
      <div>getUri: {url.getUri()}</div>
      <div>getUriWithoutDomain: {url.getUriWithoutDomain()}</div>
      <div>tags: {JSON.stringify(tags)}</div>
      <div style={{ padding: 12, margin: "12px 0", background: "#D5FDFD" }}>
        <button
          onClick={() => {
            let currentPage = url.get("page") || "1";
            let newPage = parseInt(currentPage, 10) + 1;
            url.set("page", newPage).push();
          }}
        >
          page +1
        </button>
        <button
          onClick={() => {
            let currentPage = url.get("page") || "1";
            let newPage = parseInt(currentPage, 10) + 1;
            url.set("page", newPage).replace();
          }}
        >
          page +1 (replace)
        </button>
        <button
          onClick={() => {
            url.setFragment("boo").push();
          }}
        >
          set fragment "boo"
        </button>
        <button
          onClick={() => {
            url.add("tag", Math.ceil(Math.random() * 100)).push();
          }}
        >
          add another tag
        </button>
        <button
          onClick={() => {
            url
              .subtract("tag", typeof tags === "string" ? tags : tags?.[0])
              .push();
          }}
        >
          subtract tag {typeof tags === "string" ? tags : tags?.[0]}
        </button>
        <button
          onClick={() => {
            url.delete("tag").push();
          }}
        >
          delete tag (all)
        </button>
        <button
          onClick={() => {
            url.removeFragment().push();
          }}
        >
          removeFragment
        </button>
        <button
          onClick={() => {
            url.removePath().push();
          }}
        >
          removePath
        </button>
        <button
          onClick={() => {
            url.removeQuery().push();
          }}
        >
          removeQuery
        </button>
        <button
          onClick={() => {
            url.set("x1", "y1").push();
          }}
        >
          add x1
        </button>
        <button
          onClick={() => {
            url.set("x2", "y2").push();
          }}
        >
          add x2
        </button>
        <button
          onClick={() => {
            url.removeQuery(["x1"]).push();
          }}
        >
          remove all but x1
        </button>
      </div>

      <div style={{ padding: 12, margin: "12px 0", background: "#999999" }}>
        <button
          onClick={() => {
            url.setPath("/about").push();
          }}
        >
          about
        </button>
        <button
          onClick={() => {
            url.setPath("/contacts").push();
          }}
        >
          contacts
        </button>
        <button
          onClick={() => {
            url.setPath("/another").push();
          }}
        >
          another
        </button>
      </div>
    </div>
  );
}
