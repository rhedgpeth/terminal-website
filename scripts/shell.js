class Shell {
    historyIndex = 0;
    delay = ms => new Promise(res => setTimeout(res, ms));

    constructor(app, cli) {
        this.cli = cli;
        this.initListeners(app, this);
        this.app = app;
        localStorage.history = JSON.stringify('');
    }

    initListeners(app, shell) {
        app.addEventListener("keypress", async function(event) {
            if(event.key === "Enter"){
                await shell.delay(150);

                const value = document.querySelector("input").value.toLowerCase();

                shell.updateHistory(value);

                if (value === "clear") {
                    shell.clearAll();
                }
                else {
                    const result = cli.execute(value);
                    if (result) {
                        shell.setValue(value, result.success);
                        if (result.output) {
                            shell.print(result.output);
                        }
                    }
                    else {
                        shell.setValue(value, false);
                    }
                }
                
                shell.clearInput();
                await shell.delay(150);
                shell.createInputBlock();
            }
        });
        app.addEventListener("keyup", async function(event){
            if ((event.key === "ArrowUp") || (event.key === "ArrowDown")) {
              let history = localStorage.history;
              history = history ? Object.values(JSON.parse(history)) : []
              if(event.key === "ArrowUp" && (shell.historyIndex < history.length)){
                shell.historyIndex++;
                shell.setHistoricalInput(history[history.length - shell.historyIndex]);
              }
              else if (event.key === "ArrowDown" && shell.historyIndex > 1) {
                shell.historyIndex--;
                shell.setHistoricalInput(history[history.length - shell.historyIndex]);
              }
            }
        });
        app.addEventListener("click", function(event){
            const input = document.querySelector("input");
            input.focus();
        })
    } 

    async start() {
        this.print("Starting the server...");
        await this.delay(1000);
        this.print("You can run several commands:");
        const result = cli.execute("help");
        this.print(result.output)
        await this.delay(500);
        this.createInputBlock();
    }
    
    setValue(value, success) {
        const div = document.createElement("section");
        div.setAttribute("class", "type2")
      
        const i = document.createElement("i");
        const mensagem = document.createElement("h2");
      
        if (success) {
            i.setAttribute("class", "fas fa-angle-right icone");
            mensagem.setAttribute("class", "success");
        }
        else {
            i.setAttribute("class", "fas fa-angle-right icone error");
            mensagem.setAttribute("class", "error");
        }
      
        mensagem.textContent = `${value}`;
      
        div.appendChild(i);
        div.appendChild(mensagem);
      
        app.appendChild(div);
    }

    print(text){
        const p = document.createElement("p");
        p.innerHTML = text;
        app.appendChild(p);
    }

    clearInput() {
        const div = document.querySelector(".type");
        app.removeChild(div);
    }

    clearAll() {
        document.querySelectorAll("p").forEach(e => e.parentNode.removeChild(e));
        document.querySelectorAll("section").forEach(e => e.parentNode.removeChild(e));
    }

    createInputBlock() {
        const p = document.createElement("p");
        const span1 = document.createElement("span");
        const span2 = document.createElement("span");
        p.setAttribute("class", "path")
        p.textContent = "# user";
        span1.textContent = " in";
        span2.textContent = " ~/probablyrealrob";
        p.appendChild(span1);
        p.appendChild(span2);
        app.appendChild(p);
        const div = document.createElement("div");
        div.setAttribute("class", "type")
        const i = document.createElement("i");
        i.setAttribute("class", "fas fa-angle-right icone")
        const input = document.createElement("input");
        div.appendChild(i);
        div.appendChild(input);
        app.appendChild(div);
        input.focus();
    }

    updateHistory(command) { 
        let history = localStorage.history;
        history = history ? Object.values(JSON.parse(history)) : [];
        history.push(command);
        localStorage.history = JSON.stringify(history);
        this.historyIndex = 0;
    }

    setHistoricalInput(command) {
        document.querySelector("input").value = command;
    }
}