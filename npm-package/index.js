import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function useUrl() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  class Url {
    searchParams = null;

    protocol = "";
    domain = "";
    domainWithPort = "";
    port = "";
    path = "/";
    fragment = "";

    constructor(
      searchParams,
      protocol,
      domain,
      domainWithPort,
      port,
      path,
      fragment
    ) {
      this.searchParams = searchParams;

      this.protocol = protocol || window?.location?.protocol;
      this.domain = domain || window?.location?.hostname;
      this.domainWithPort = domainWithPort || window?.location?.host;
      this.port = port || window?.location?.port;
      this.path = path || window?.location?.pathname || "/";
      this.fragment = fragment || window?.location?.hash;
    }

    __clone(
      searchParams,
      protocol,
      domain,
      domainWithPort,
      port,
      path,
      fragment
    ) {
      return new Url(
        searchParams || this.searchParams,
        protocol || this.protocol,
        domain || this.domain,
        domainWithPort || this.domainWithPort,
        port || this.port,
        path || this.path,
        fragment || this.fragment
      );
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
      let _new = this.__clone();
      variablesToKeep = variablesToKeep || [];
      if (variablesToKeep) {
        if (typeof variablesToKeep === "string") {
          variablesToKeep = [variablesToKeep];
        }
      }

      let valuesMap = {};
      if (variablesToKeep?.length > 0) {
        variablesToKeep.forEach((_variableToKeep) => {
          valuesMap[_variableToKeep] = _new.getAll(_variableToKeep);
        });
      }

      _new.searchParams = new URLSearchParams({});

      variablesToKeep.forEach((_variableToKeep) => {
        if (valuesMap[_variableToKeep]) {
          valuesMap[_variableToKeep].forEach((_value) => {
            _new = _new.add(_variableToKeep, _value);
          });
        }
      });

      return _new;
    }

    removeFragment() {
      let _new = this.__clone();
      _new.fragment = "";
      return _new;
    }

    removePath() {
      let _new = this.__clone();
      _new.path = "";
      return _new;
    }

    setPath(value, doKeepQuery) {
      let _new = this.__clone();
      if (doKeepQuery !== true) {
        _new = _new.removeQuery();
        _new = _new.removeFragment();
      }
      _new.path = value || "/";
      return _new;
    }

    setFragment(value) {
      let _new = this.__clone();
      value = value || "";
      if (value.slice(0, 1) !== "#") {
        value = `#${value}`;
      }
      _new.fragment = value;
      return _new;
    }

    set(variable, value) {
      let _new = this.__clone();

      if (variable) {
        if (value === null) {
          value = undefined;
        }

        if (typeof value === "undefined") {
          _new.searchParams.delete(variable);
        } else if (typeof value === "string") {
          _new.searchParams.set(variable, value);
        } else if (typeof value === "object" && Array.isArray(value)) {
          _new.searchParams.delete(variable);
          if (value.length > 0) {
            value.forEach((_value) => {
              _new.searchParams.append(variable, _value);
            });
          }
        } else {
          _new.searchParams.set(variable, JSON.stringify(value));
        }
      }
      return _new;
    }

    add(variable, value) {
      let _new = this.__clone();
      if (variable && typeof variable === "string") {
        let _current = _new.searchParams.getAll(variable);
        if (_current.includes(value) === false) {
          _new.searchParams.append(variable, value);
        }
      }
      return _new;
    }

    subtract(variable, value) {
      let _new = this.__clone();
      if (variable) {
        let _current = _new.searchParams.getAll(variable);
        _new.searchParams.delete(variable);
        _current = _current.filter((x) => x !== value);
        if (_current.length > 0) {
          _current.forEach((x) => _new.searchParams.append(variable, x));
        }
      }
      return _new;
    }

    delete(variable) {
      let _new = this.__clone();
      if (variable) {
        _new.searchParams.delete(variable);
      }
      return _new;
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

  return new Url(searchParams);
}
