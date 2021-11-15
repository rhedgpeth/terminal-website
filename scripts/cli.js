const cli = {};

function getCommand(cmd) {
    let result = null;
    for (var i = 0; i < commands.length; i++){
        if (commands[i].command == cmd){
            result = commands[i];
        }
    }
    return result;
}

function getArgument(args, arg) {
    let result = null;
    for (var i = 0; i < args.length; i++){
        if (args[i].argument == arg){
            result = args[i];
        }
    }
    return result;
}

cli.execute = (cmd) => {
    let result = { success: false };
    const values = cmd.split(' ');

    if (values) {
        if (values[0] === "joke") {
            const joke = jokes[Math.floor(Math.random() * 9)];
            result.success = true;
            result.output = `${joke.question}<br /><br />${joke.answer}`;
        }  
        else {      
            let command = getCommand(values[0]);

            if (command) {
                if (values.length > 1 && command.arguments) {
                    let argument = getArgument(command.arguments, values[1]);
                    if (argument) {
                        result.success = true;
                        result.output = argument.output;
                        console.log(argument.output);
                    }
                    else {
                        result.success = false;
                    }
                } 
                else {
                    result.success = command.valid ?? true;
                    result.output = command.output;
                }
            }
            else {
                result.output = `command not found: ${cmd}`;
            }
        }
    }

    return result;
};

function init() {
    const app = document.querySelector("#app");
    const terminal = new Shell(app, cli);
    terminal.start();
}

init();

const commands = [
    {
        command: "help",
        output: "<span class='code'> \
                    about [-b | -c | -s]  \
                    <div class='text tab'> \
                        OPTIONS: \
                        <table class='actions'> \
                            <tr> \
                                <td>-b</td> \
                                <td>Biography, background and experience</td> \
                            </tr> \
                            <tr> \
                                <td>-c</td> \
                                <td>List contact information</td> \
                            </tr> \
                            <tr> \
                                <td>-s</td> \
                                <td>List social media accounts</td> \
                            </tr> \
                        </table> \
                    </div> \
                </span> \
                <span class='code'> \
                    portfolio [-b | -c | -e | -p | -v]  \
                    <div class='text tab'> \
                        OPTIONS: <br /> \
                        <table class='actions'> \
                            <tr> \
                                <td>-b</td> \
                                <td>List blog sources</td> \
                            </tr> \
                            <tr> \
                                <td>-c</td> \
                                <td>List of projects contributed to</td> \
                            </tr> \
                            <tr> \
                                <td>-e</td> \
                                <td>List speaking engagements and events</td> \
                            </tr> \
                            <tr> \
                                <td>-p</td> \
                                <td>List publications</td> \
                            </tr> \
                            <tr> \
                                <td>-v</td> \
                                <td>List technical demonstration videos</td> \
                            </tr> \
                        </table> \
                    </div> \
                </span> \
                <span class='code'> \
                    joke \
                    <div class='text tab bottom-8'> \
                        Tell me a joke! \
                    </div> \
                </span> \
                <span class='code'> \
                    clear \
                    <div class='text tab bottom-8'> \
                        Clear the terminal output \
                    </div> \
                </span> \
                <span class='code'> \
                    help \
                    <div class='text tab'> \
                        List all commands \
                    </div> \
                </span> \
                "
    },
    {
        command: "about",
        valid: false,
        output: "invalid command, must supply argument",
        arguments: [
            {
                argument: "-b",
                output: " \
                            <div class='output'> \
                                <span class='bg-green'>CURRENT LOCATION</span> \
                                <p>Chicago, IL USA</p> \
                                <span class='bg-green'>CURRENT ROLE</span> \
                                <p>Director of Developer Relations @ MariaDB</p> \
                                <span class='bg-green'>BIOGRAPHY & BACKGROUND</span> \
                                <p>Rob grew up in a small town in Southwest Missouri. He comes from a long line of farmers, but \
                                decided at a young age that he wanted to take a different path. He attended Missouri State University \
                                graduated with a B.S. in Computer Science, minoring in Mathematics and Physics. <br /><br /> \
                                Since graduating, Rob has created all kinds of software using a variety of different technologies and \
                                programming languages.</p> \
                                <span class='bg-green'>EXPERIENCE</span> \
                                <table class='output auto bordered collapsed padded'> \
                                    <tr> \
                                        <td>YEARS OF EXP.</td> \
                                        <td># OF UNIQUE TALKS</td> \
                                        <td># OF BLOG POSTS</td> \
                                        <td># OF BOOKS</td> \
                                    </tr> \
                                    <tr> \
                                        <td>15</td> \
                                        <td>25+</td> \
                                        <td>40+</td> \
                                        <td>1</td> \
                                    </tr> \
                                </table> \
                            </div> \
                        "
            },
            {
                argument: "-c",
                output: "<table class='output auto bordered collapsed padded'> \
                            <tr> \
                                <td>Personal email:</td> \
                                <td><a href='mailto:rob.hedgpeth@gmail.com' target='_blank'>rob.hedgpeth@gmail.com <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                            <tr> \
                                <td>Work email:</td> \
                                <td><a href='mailto:robh@mariadb.com' target='_blank'>robh@mariadb.com <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                        </table>"
            },
            {
                argument: "-s",
                output: "<table class='output auto bordered collapsed padded'> \
                            <tr> \
                                <td>LinkedIn:</td> \
                                <td><a href='https://www.linkedin.com/in/robhedgpeth/' target='_blank'>linkedin.com/in/robhedgpeth <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                            <tr> \
                                <td>GitHub:</td> \
                                <td><a href='https://github.com/rhedgpeth' target='_blank'>@rhedgpeth <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                            <tr> \
                                <td>Twitter:</td> \
                                <td><a href='https://twitter.com/probablyrealrob' target='_blank'>@probablyrealrob <i class='fas fa-external-link-alt'></i></td> \
                            </tr> \
                        </table>"
            }
        ]
    },
    {
        command: "portfolio",
        valid: false,
        output: "invalid command, must supply argument",
        arguments: [
            {
                argument: "-b",
                output: "<p>Check out my blog posts on:</p> \
                        <ul class='output dash'> \
                            <li><a href='https://dev.to/probablyrealrob' target='_blank'>DEV Community <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://hackernoon.com/u/grobbert' target='_blank'>Hackernoon <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://medium.com/@robert.hedgpeth' target='_blank'>Medium <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://mariadb.com/resources/blog/author/roberthedgpeth/' target='_blank'>Official MariaDB Blog <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://blog.couchbase.com/author/robert-hedgpeth/' target='_blank'>Official Couchbase Blog <i class='fas fa-external-link-alt'></i></a></li> \
                        </ul>"
            },
            {
                argument: "-c",
                output: "<div class='output'> \
                            <p>Recent projects Rob has created and contributed to:</p>\
                            <table class='output auto bordered collapsed padded actions'> \
                                <tr> \
                                    <td>Project</td> \
                                    <td>Description</td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://github.com/mariadb-corporation?q=dev-example&type=&language=&sort=' target='_blank'>MariaDB Developer Examples <i class='fas fa-external-link-alt'></i></td> \
                                    <td>Several repositores spanning a variety of different programming languages and technologies.</td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://www.nuget.org/packages/Couchbase.Lite.Mapping/' target='_blank'>Couchbase Lite Mapping <i class='fas fa-external-link-alt'></i></td> \
                                    <td>A simple component that extends Couchbase.Lite to provide methods to convert between data models and objects. </td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://github.com/couchbaselabs/CouchDraw' target='_blank'>CouchDraw <i class='fas fa-external-link-alt'></i></td> \
                                    <td>A multi-user synchronized drawing application for iOS and Android.</td> \
                                </tr> \
                                <tr> \
                                    <td><a href='https://github.com/couchbaselabs/chatbase' target='_blank'>Chatbase <i class='fas fa-external-link-alt'></i></td> \
                                    <td>A simple chat app power by Couchbase Lite and Sync Gateway.</td> \
                                </tr> \
                            </table> \
                        </div>"
            },
            {
                argument: "-e",
                output: "<p>Events Rob has presented/spoken at in 2021:</p> \
                        <ul class='output dash'> \
                            <li><a href='https://plus.qconferences.com/plus2021/speakers/rob-hedgpeth' target='_blank'>QCon Plus (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/22Q1-WBN-GLBL-DBaaS-Future-of-Databases-Massive-Scale-2021-10-28_Registration-LP.html' target='_blank'>Distributed SQL & MariaDB (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.scale.bythebay.io/speakers-1' target='_blank'>Scale By The Bay (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://cloud.withgoogle.com/next/speakers?speaker=85D45B91CC7BFFFC' target='_blank'>Google Next (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.bigdata-toronto.com/blog/speakers/robert-hedgpeth-3/' target='_blank'>Big Data & AI Toronto (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://mariadb.com/resources/webinars/database-innovation-summit-2021-why-dbaas-is-the-future-of-cloud-computing/' target='_blank'>MariaDB Database Innovation Summit (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q4-WBN-GLBL-OSSG-NoSQL-Listener-2021-09-14_Registration-LP.html' target='_blank'>Managing NoSQL Data with a Relational Database (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.developerweek.com/global/conference/cloud/speakers/' target='_blank'>DeveloperWeek Global (Conference)<i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q4-WBN-GLBL-OSSG-Python-Connector-2021-08-26_Registration-LP.html' target='_blank'>Python + MariaDB (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://buildingthebackend.com/data-store/a-powerful-open-source-database-that-supports-many-storage-needs-mariadb/' target='_blank'>Building the Backend (Podcast) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://rss.com/podcasts/councilofthewisedevelopers/257228/' target='_blank'>Council of the Wise Developers (Podcast) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://emamo.com/event/jlove-2021/r/speaker/rob-hedgpeth-7' target='_blank'>jLove (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://dmradio.libsyn.com/-skys-the-limit-why-cloud-databases-will-rule' target='_blank'>DM Radio (Live Radio & Podcast) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://mariadb.org/cloud-minifest2021/skysql/' target='_blank'>MariaDB Foundation Server Fest (Conference)<i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://mariadb.com/resources/webinars/database-innovation-summit-2021/' target='_blank'>MariaDB Database Innovation Summit (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q3-WBN-GLBL-OSSG-JSON-Hybrid-Data-Models-2021-06-15_Registration-LP.html' target='_blank'>JSON + MariaDB (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q3-WBN-GLBL-OSSG-Unleash-Reactive-Programming-R2DBC-2021-05-27_Registration-LP.html' target='_blank'>MariaDB Webinar - R2DBC <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://pheedloop.com/dsconnect2021/site/sessions/?id=SESWB8Z40SHOXYABQ' target='_blank'>Data Summit Connect (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.developerweek.com/global/conference/management/speakers/' target='_blank'>DeveloperWeek Global Management (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.developerweek.com/europe/' target='_blank'>DeveloperWeek Europe <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q3-WBN-GLBL-OSSG-Columnar-Storage-Python-2021-04-13_Registration-LP.html' target='_blank'>MariaDB ColumnStore + Python (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://datalove.konfy.care/schedule/' target='_blank'>Data Love (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q2-WBN-GLBL-OSSC-PLSQL-Compatibility-2021-03-31_Registration-LP.html' target='_blank'>MariaDB & PL/SQL (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.conf42.com/enterprise2021' target='_blank'>Conf42 Enterprsie Software (Conference) <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://go.mariadb.com/21Q2-WBN-GLBL-OSSG-Modern-SQL-with-MariaDB-2021-02-17_Registration-LP.html' target='_blank'>Modern SQL with MariaDB (Webinar) <i class='fas fa-external-link-alt'></i></a></li> \
                        </ul>"
            },
            {
                argument: "-p",
                output: "<p>Rob has written the first and only book, R2DBC Revealed, on a new relational database connectivity specification. <br /><br /> \
                        R2DBC Revealed, published by Apress, introduces Reactive Relational Database Connectivity (R2DBC), a modern way of connecting to \
                        and querying relational databases from Java and other JVM languages. The book begins by helping you understand not only what \
                        reactive programming is, but why it is necessary. Then building on those fundamentals, the book takes you into the world of databases \
                        and the newly released Reactive Relational Database Connectivity (R2DBC) specification. <br /><br /> \
                        Some of the places R2DBC Revealed can be found are:</p> \
                        <ul class='output dash'> \
                            <li><a href='https://link.springer.com/book/10.1007/978-1-4842-6989-3' target='_blank'>Spring Link <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.amazon.com/R2DBC-Revealed-Relational-Connectivity-Programmers-ebook/dp/B091KFC3TX/' target='_blank'>Amazon <i class='fas fa-external-link-alt'></i></a></li> \
                            <li><a href='https://www.goodreads.com/book/show/56906027-r2dbc-revealed' target='_blank'>goodreads <i class='fas fa-external-link-alt'></i></a></li> \
                        </ul>"
            },
            {
                argument: "-v",
                output: "<p>Recent technical demonstration videos Rob has created:</p> \
                        <ul class='output dash'> \
                        <li><a href='https://www.youtube.com/watch?v=rzALUEZ6uFU' target='_blank'>Columnar Storage + Python Powering Modern Data Science and Analytics <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=y1ahXZn0nWQ' target='_blank'>Taking Distributed SQL to the Next Level with Columnar Indexing <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=3igIRQqmYc4' target='_blank'>The future of databases: distributed SQL & MariaDB <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=ntO2x4XHfUE' target='_blank'>Demo of MariaDB's Oracle Compatibility Mode <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=ZnFq_S6T9Qc' target='_blank'>Intro to MariaDB's Oracle Compatibility Mode <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=2VEbgfluQqs' target='_blank'>Getting started with JSON table in MariaDB <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=-rf41EmgNO0' target='_blank'>Intro to JSON in MariaDB <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=EL9wyrpFP78' target='_blank'>Creating Fully Reactive Solutions with R2DBC <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=MF7UItjxDWA' target='_blank'>Getting Reactive with Relational Databases and R2DBC <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=KRmosdzNGrY' target='_blank'>SkySQL: The MariaDB Database-as-a-Service <i class='fas fa-external-link-alt'></i></a></li> \
                        <li><a href='https://www.youtube.com/watch?v=bIaFIuQc9YQ' target='_blank'>MariaDB Cloud Server Fest - Panel <i class='fas fa-external-link-alt'></i></a></li> \
                    </ul>"
            }
        ]
    }
];

const jokes = [
    {
      question: "How many software developers does it take to screw in a light bulb?",
      answer: "...zero, that's a hardware issue."
    },
    {
      question: "I’ve created a writing software to rival Microsoft.",
      answer: "...it’s their Word against mine."
    },
    {
      question: "What do you call a software wizard that installs applications?",
      answer: "...The Wizard of OS."
    },
    {
      question: "Why is Windows software so predictable?",
      answer: "...you can see right through it."
    },
    {
      question: "Why do most software developers need glasses?",
      answer: "..because they can't C#."
    },
    {
      question: "When software doesn't work?",
      answer: "...it just bugs me."
    },
    {
      question: "What's the difference between a junior software engineer and a senior software engineer?",
      answer: "...a senior software engineer writes bad code faster."
    },
    {
      question: "Do you know the difference between a car salesperson and a software salesperson?",
      answer: "...the car salesperson knows when they're lying."
    },
    {
      question: "If bees start writing software...",
      answer: "Beware"
    }
  ];