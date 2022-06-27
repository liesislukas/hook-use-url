import Navigation from "./elements/Navigation";

export default function Layout({children}) {
  return (
    <div>
      <div><Navigation/></div>
      <div style={{margin: 24}}>
        {children}
      </div>
    </div>
  );
}
