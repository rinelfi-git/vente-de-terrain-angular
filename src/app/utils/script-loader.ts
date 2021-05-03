export class ScriptLoader {
  scripts: string[] = [];
  id: string;

  constructor() {
    this.id = '';
  }

  append(script: string | string[]): ScriptLoader {
    if (script instanceof Array) {
      script.forEach(tmp => {
        let scriptExiste = false;
        this.scripts.forEach(argTmp => {
            if (tmp === argTmp) { scriptExiste = true; }
          }
        );
        if (!scriptExiste) { this.scripts.push(tmp); }
      });
    } else {
      let scriptExiste = false;
      this.scripts.forEach(scriptTemp => {
          if (script === scriptTemp) { scriptExiste = true; }
        }
      );
      if (!scriptExiste) { this.scripts.push(script); }
    }
    return this;
  }

  remove(script: string | string[]): ScriptLoader {
    if (script instanceof Array) {
      script.forEach(tmp => {
        this.scripts.find((source, index) => {
          if (source === tmp) { this.scripts.splice(index, 1); }
        });
      });
    } else {
      this.scripts.find((source, index) => {
        if (source === script) { this.scripts.splice(index, 1); }
      });
    }
    return this;
  }

  setId(id: string): ScriptLoader {
    this.id = id;
    return this;
  }

  load(): void {
    this.scripts.forEach(script => {
      const body = document.querySelector('body');
      const baliseScript = document.createElement('script');
      baliseScript.src = script;
      baliseScript.setAttribute('type', 'text/javascript');
      baliseScript.setAttribute('generator', this.id !== '' ? this.id : 'script-loader');
      if (body) {
        body.appendChild(baliseScript);
      }
    });
  }

  destroy(): void {
    const baliseScript = document.querySelectorAll('script[generator=' + (this.id !== '' ? this.id : 'script-loader') + ']');
    const body = document.querySelector('body');
    baliseScript.forEach(balise => body && body.removeChild(balise));
  }

  reload(): void {
    this.destroy();
    this.load();
  }
}
