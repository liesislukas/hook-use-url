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

    protocol = "";
    domain = "";
    domainWithPort = "";
    port = "";
    path = "/";
    fragment = "";

    constructor(location, navigate, searchParams) {
      this.location = location;
      this.navigate = navigate;
      this.searchParams = searchParams;

      this.protocol = window?.location?.protocol;
      this.domain = window?.location?.hostname;
      this.domainWithPort = window?.location?.host;
      this.port = window?.location?.port;
      this.path = this?.location?.pathname || "/";
      this.fragment = window?.location?.hash;
    }

    getProtocol() {
      return this.protocol;
    }

    getDomain() {
      return this.domain;
    }

    getDomainWithPort() {
      return this.domainWithPort;
    }

    getPort() {
      return this.port;
    }

    getPath() {
      return this.path;
    }

    getQuery() {
      return this.searchParams.toString();
    }

    getFragment() {
      return this.fragment;
    }

    getUri() {
      let _uriParts = [];
      if (this.getProtocol()) {
        _uriParts.push(`${this.getProtocol()}//`);
      }
      if (this.getDomainWithPort()) {
        _uriParts.push(this.getDomainWithPort());
      }
      _uriParts.push(this.getUriWithoutDomain());
      return _uriParts.join("");
    }

    getUriWithoutDomain() {
      let _uriParts = [];
      _uriParts.push(this.getPath() || "/");
      if (this.getQuery() && !this.getFragment()) {
        _uriParts.push(`?${this.getQuery()}`);
      }
      if (!this.getQuery() && this.getFragment()) {
        _uriParts.push(`${this.getFragment()}`);
      }
      if (this.getQuery() && this.getFragment()) {
        _uriParts.push(`?${this.getQuery()}${this.getFragment()}`);
      }
      return _uriParts.join("");
    }

    get(variable) {
      let result;
      if (variable) {
        let _result = this.searchParams.getAll(variable);
        if (_result?.length === 1) {
          result = _result[0];
        } else if (_result?.length > 1) {
          result = _result;
        }
      }
      return result;
    }

    getAll(variable) {
      let result = [];
      if (variable && typeof variable === "string") {
        result = this.searchParams.getAll(variable);
      }
      return result;
    }

    removeQuery(variablesToKeep) {
      variablesToKeep = variablesToKeep || [];
      if (variablesToKeep) {
        if (typeof variablesToKeep === "string") {
          variablesToKeep = [variablesToKeep];
        }
      }

      let valuesMap = {};
      if (variablesToKeep?.length > 0) {
        variablesToKeep.forEach((_variableToKeep) => {
          valuesMap[_variableToKeep] = this.getAll(_variableToKeep);
        });
      }
      this.searchParams = new URLSearchParams({});

      variablesToKeep.forEach((_variableToKeep) => {
        if (valuesMap[_variableToKeep]) {
          valuesMap[_variableToKeep].forEach((_value) => {
            this.add(_variableToKeep, _value);
          });
        }
      });

      return this;
    }

    removeFragment() {
      this.fragment = "";
      return this;
    }

    removePath() {
      this.path = "/";
      return this;
    }

    setPath(value, doKeepQuery) {
      if (doKeepQuery !== true) {
        this.removeQuery();
        this.removeFragment();
      }
      this.path = value || "/";
      return this;
    }

    setFragment(value) {
      value = value || "";
      if (value.slice(0, 1) !== "#") {
        value = `#${value}`;
      }
      this.fragment = value || "";
      return this;
    }

    set(variable, value) {
      if (variable) {
        if (value === null) {
          value = undefined;
        }

        if (typeof value === "undefined") {
          this.searchParams.delete(variable);
        } else if (typeof value === "string") {
          this.searchParams.set(variable, value);
        } else if (typeof value === "object" && Array.isArray(value)) {
          this.searchParams.delete(variable);
          if (value.length > 0) {
            value.forEach((_value) => {
              this.searchParams.append(variable, _value);
            });
          }
        } else {
          this.searchParams.set(variable, JSON.stringify(value));
        }
      }
      return this;
    }

    add(variable, value) {
      if (variable && typeof variable === "string") {
        let _current = this.searchParams.getAll(variable);
        if (_current.includes(value) === false) {
          this.searchParams.append(variable, value);
        }
      }
      return this;
    }

    subtract(variable, value) {
      if (variable) {
        let _current = this.searchParams.getAll(variable);
        this.searchParams.delete(variable);
        _current = _current.filter((x) => x !== value);
        if (_current.length > 0) {
          _current.forEach((x) => this.searchParams.append(variable, x));
        }
      }
      return this;
    }

    delete(variable) {
      if (variable) {
        this.searchParams.delete(variable);
      }
      return this;
    }

    push() {
      navigate(this.getUriWithoutDomain(), { replace: false });
      return this;
    }

    replace() {
      navigate(this.getUriWithoutDomain(), { replace: true });
      return this;
    }
  }

  return new Url(location, navigate, searchParams);
}
