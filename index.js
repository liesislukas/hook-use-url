import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function useUrl() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  class Url {
    location = null;
    navigate = null;
    searchParams = null;

    constructor(location, navigate, searchParams) {
      this.location = location;
      this.navigate = navigate;
      this.searchParams = searchParams;
    }
  }

  let url = new Url(location, navigate, searchParams);

  // let url = {
  //   searchParams,
  //   location,
  //   navigate,
  //
  //   protocol: window?.location?.protocol,
  //   domain: window?.location?.hostname,
  //   domainWithPort: window?.location?.host,
  //   port: window?.location?.port,
  //   path: this?.location?.pathname || "/",
  //   fragment: window?.location?.hash,
  //
  //   getUri: () => {
  //     let _uriParts = [];
  //     if (this.getProtocol()) {
  //       _uriParts.push(`${this.getProtocol()}//`);
  //     }
  //     if (this.getDomainWithPort()) {
  //       _uriParts.push(this.getDomainWithPort());
  //     }
  //     _uriParts.push(this.getUriWithoutDomain());
  //     return _uriParts.join("");
  //   },
  //   getUriWithoutDomain: () => {
  //     let _uriParts = [];
  //     _uriParts.push(this.getPath() || "/");
  //     if (this.getQuery() && !this.getFragment()) {
  //       _uriParts.push(`${this.getQuery()}`);
  //     }
  //     if (!this.getQuery() && this.getFragment()) {
  //       _uriParts.push(`#${this.getFragment()}`);
  //     }
  //     if (this.getQuery() && this.getFragment()) {
  //       _uriParts.push(`?${this.getQuery()}#${this.getFragment()}`);
  //     }
  //     return _uriParts.join("");
  //   },
  //   getProtocol: () => this.protocol,
  //   getDomain: () => this.domain,
  //   getDomainWithPort: () => this.domainWithPort,
  //   getPort: () => this.port,
  //   getPath: () => this.path,
  //   getQuery: () => this.searchParams.toString(),
  //   getFragment: () => this.fragment,
  //   get: (variable) => {
  //     let result;
  //     if (variable) {
  //       let _result = this.searchParams.getAll(variable);
  //       if (_result?.length === 1) {
  //         result = _result[0];
  //       } else if (_result?.length > 1) {
  //         result = _result;
  //       }
  //     }
  //     return result;
  //   },
  //   removeQuery: () => {
  //     this.searchParams = new URLSearchParams({});
  //     return this;
  //   },
  //   removeFragment: () => {
  //     this.fragment = "";
  //     return this;
  //   },
  //   removePath: () => {
  //     this.path = "/";
  //     return this;
  //   },
  //   setPath: (value) => {
  //     this.path = value || "/";
  //     return this;
  //   },
  //   set: (variable, value) => {
  //     if (variable && typeof variable === "string") {
  //       if (typeof value === "undefined") {
  //         this.searchParams.delete(variable);
  //       }
  //
  //       if (typeof value === "string") {
  //         this.searchParams.set(value);
  //       }
  //
  //       if (typeof value === "object" && Array.isArray(value)) {
  //         this.searchParams.delete(variable);
  //         if (value.length > 0) {
  //           value.forEach((_value) => {
  //             this.searchParams.append(variable, _value);
  //           });
  //         }
  //       }
  //     }
  //     return this;
  //   },
  //   add: (variable, value) => {
  //     if (variable && typeof variable === "string") {
  //       let _current = this.searchParams.getAll(variable);
  //       if (_current.includes(value) === false) {
  //         this.searchParams.append(variable, value);
  //       }
  //     }
  //     return this;
  //   },
  //   remove: (variable) => {
  //     if (variable) {
  //       this.searchParams.delete(variable);
  //     }
  //     return this;
  //   },
  //   push: () => {
  //     navigate(this.getUriWithoutDomain(), { replace: false });
  //   },
  //   replace: () => {
  //     navigate(this.getUriWithoutDomain(), { replace: true });
  //   },
  // };

  return url;
}
