    {const router = require('express').Router();
    const Post = require('../models/Post');
    const User = require('../models/User');
    const SpecialPost = require('../models/specialpost');
    const PostDislike = require('../models/PostDislike');
    const IDStorage = require('../models/IDStorage');
    const PostLike = require('../models/PostLike');
    const path = require('path'); 
    const fs = require('fs');
    const PostSurvey = require('../models/PostSurvey');
    const Repost = require('../models/Repost');
    //var ObjectId = require('mongodb').ObjectID;
    
    const Comment = require('../models/Comment');
    const Subscription = require('../models/Subscription');
    const webPush = require ('web-push');
    const mongoose = require('mongoose');
    const { ObjectId } = require('mongoose').Types;
    const conn = mongoose.createConnection('mongodb+srv://abdulsittar72:2106010991As@cluster0.gsnbbwq.mongodb.net/test?retryWrites=true&w=majority');
    const verifyToken = require('../middleware/verifyToken');
    const axios = require('axios');
    const cheerio = require('cheerio');
    const sanitizeHtml = require('sanitize-html');
    const DOMPurify = require('dompurify');
    const logger = require('../logs/logger');
    
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurifyInstance = DOMPurify(window);
    /**
     * @swagger
     * components:
     *   schemas:
     *     Post:
     *       type: object
     *       required:
     *         - userId
     *         - desc
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post
     *         userId:
     *           type: string
     *           description: The userid of user who is creating the post 
     *         desc:
     *           type: string
     *           description: The text of the post
     *         likes:
     *           type: array
     *           description: an array of post-likes'
     *         dislikes:
     *           type: array
     *           description: an array of post-dislikes'
     *         reposts:
     *           type: array
     *           description: an array of reposts-users'
     *         comments:
     *           type: string
     *           format: email
     *           description: The comments of the user
     *         password:
     *           type: string
     *           description: The password of the user
     *       example:
     *         email: XYZ@gmail.com
     *         password: 123456
     */

   /**
     * @swagger
     * components:
     *   schemas:
     *     Postlike:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post
     *         userId:
     *           type: string
     *           description: The id of a user who is liking the post.
     *         postId:
     *           type: string
     *           description: The id of a post which is being liked.
     */

     /**
     * @swagger
     * components:
     *   schemas:
     *     Postdislike:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post
     *         userId:
     *           type: string
     *           description: The id of a user who is disliking the post.
     *         postId:
     *           type: string
     *           description: The id of a post which is being disliked.
     */


     /**
     * @swagger
     * components:
     *   schemas:
     *     Repost:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the reposted object
     *         userId:
     *           type: string
     *           description: The id of a user who is reposting the post.
     *         postId:
     *           type: string
     *           description: The id of a post which is being reposted.
     */

     /**
     * @swagger
     * components:
     *   schemas:
     *     Readpost:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post which is being read
     *         userId:
     *           type: string
     *           description: The id of the user who is reading it.
     *         postId:
     *           type: string
     *           description: The id of the post which is being read
     */

    /**
     * 
     /**
     * @swagger
     * components:
     *   schemas:
     *     Viewpost:
     *       type: object
     *       required:
     *         - userId
     *         - postId
     *       properties:
     *         id:
     *           type: string
     *           description: The auto-generated id of the post which is being viewed
     *         userId:
     *           type: string
     *           description: The id of the user who is viewing it.
     *         postId:
     *           type: string
     *           description: The id of the post which is being viewed
     */

    /**
    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /:
     *   post:
     *     summary: Create a new post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: user id
     *       - in: path
     *         name: desc
     *         schema:
     *           type: string
     *         required: true
     *         description: text of the post
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: The post is created!
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error!
     */

    const extractImageFromUrl = async (url) => {
        try {
            // Make an HTTP GET request to the URL
            const response = await axios.get(url);
            
            // Load HTML response into cheerio
            const $ = cheerio.load(response.data);
            
            // Look for the first <img> tag and get its 'src' attribute
            const firstImageUrl = $('img').first().attr('src');
            
            // Check if an image URL was found and if it's a full URL
            if (firstImageUrl) {
                // If the image URL is relative, resolve it against the original URL
                const imageUrl = new URL(firstImageUrl, url).href;
                return imageUrl;
            }
            
            // No image found on the page
            return null;
        } catch (error) {
        
            console.error(`Error fetching or parsing URL (${url}):`, error.message);
            return null;
        }
    };


    const extractUrls = (text) => {
        const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/g;
    const urls = text.match(urlRegex) || [];
    // Filter URLs for common image extensions
    return urls.filter((url) => /\.(jpeg|jpg|gif|png|webp)$/.test(url.toLowerCase()));
    // Iterate over each URL and find an image link if it exists
    //for (const url of urls) {
     //   const imageUrl = await extractImageFromUrl(url);
      //  if (imageUrl) {
       //     return imageUrl;  // Return the first image URL found
        //}
    }
    
    // Return null if no images were found on any URL
    //return null;
    //};

    function sanitizeInput(input) {

        return DOMPurifyInstance.sanitize(input, { ALLOWED_TAGS: [] });
        
        
        var val = sanitizeHtml(input, {
            allowedTags: [], // No HTML allowed
            allowedAttributes: {} // No attributes allowed
        });
        return val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    
    router.post('/random_id', async (req, res) => {
        try {
      
          // Get a random document's 'yourID' from the collection
          const randomDoc = await IDStorage.aggregate([
            { $match: { available: true } }, // Only include documents with available: true
            { $sample: { size: 1 } } // Get a random document
        ]);

          logger.info("randomDoc");
          logger.info(randomDoc);
          
          if (randomDoc.length > 0) {
            res.status(200).json({ yourID: randomDoc[0].yourID });
          } else {
            res.status(404).json({ message: "No data found" });
          }
    
        } catch (err) {
            console.log("Error details:", err.message); // Log just the error message
            logger.error("Stack trace:", err.stack); // Log the stack trace explicitly
            res.status(500).json({ error: "Failed to fetch data" });
        }
      });


    // create a post
    router.post('/:id/create', verifyToken,   async(req, res) => { //verifyToken, 
        console.log(req.params);
        console.log(req.body);
        logger.info('Data received', { data: req.body });
        var linktoAdd = ""
        var urls = extractUrls(req.body.desc);
        
        if (urls.length > 0) {
            linktoAdd = urls[0]
            
        }
        console.log(linktoAdd);

        const newPost = new Post({userId: mongoose.Types.ObjectId(req.body.userId), pool: req.body.pool, desc: sanitizeInput(req.body.desc), thumb: linktoAdd});
        //console.log(newPost);
        
        try {
            const savedPost = await newPost.save(); 
            res.status(200).json(savedPost);
        }catch(err) {
            logger.error('Error saving data', { error: err.message });
            res.status(500).json(err);
        }
        })
        
        const createAndSavePost = async (data) => {
            try {
                const newPost = new Post(data);
                const savedPost = await newPost.save();
                console.log("Post saved successfully:", savedPost);
                return savedPost;
            } catch (error) {
                logger.error('Error saving data', { error: error.message });
                console.error("Error creating or saving post:", error);
                throw error;
            }
        };
        
        
        const createAndSaveComment = async (data) => {
            try {
                const newPost = new Comment(data);
                const savedPost = await newPost.save();
                console.log("Comment saved successfully:", savedPost);
                return savedPost;
            } catch (error) {
                console.error("Error creating or saving comment:", error);
                throw error;
            }
        };

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            return array;
        };
        
              
        router.post('/:id/createInitialData', verifyToken, async (req, res) => {
            logger.info('Data received', { data: req.body });
 
            const trainPosts2 = [
                "https://x.com/NetflixDE/status/1824355418270818620",
                "https://x.com/SkySportDE/status/1848090817790960023",
                "https://x.com/Tagesspiegel/status/1848243992384643146",
                "https://x.com/derspiegel/status/1848088325636473070",
            ];
            
            const trainPosts3 = [
                `<p>Zeit, das Dating Game in Deutschland auf ein neues Level zu heben. </p> <br /> <p>Love is Blind Germany: ab Anfang 2025, nur auf Netflix.</p> <br />`,
                `<p>Das ist die Tabelle in der Bundesliga nach dem 7. Spieltag! 📈⚽ #SkyBundesliga</p>`,
                `<p>#Berlin muss Milliarden kürzen, um den Haushalt in den Griff zu bekommen. Doch Schwarz-Rot verschleppt nötige Entscheidungen – und lähmt damit die Stadt. Ein Kommentar.</p>`,
                `<p>Seit Wochen behauptet Donald Trump, seine Konkurrentin Kamala Harris habe sich einen Sommerjob bei McDonald's ausgedacht – Belege hat er keine. Nun posiert er selbst an der Fritteuse.</p>`,
                
            ];
            
            const trainPosts4 = [
                `<p>Pods auf, Augen zu, Gefühle AN ❤️👀 Love Is Blind kommt endlich nach Deutschland! Ab 3. Januar, nur auf Netflix.</p> <br />`,
                `<p>Die Hinrunde in der Bundesliga ist gespielt - wir zeigen euch die Torjäger! <br />⚽🔥</p>`,
                `<p>Konservativ gegen autoritär: Je stärker die AfD wird, umso entschiedener versucht der CDU-Chef, sie mit einem Kurs der Mitte zu bezwingen. Wird ihm das gelingen? #red<br /></p>`,
                `<p>Das gemeinsame Votum mit der AfD brachte CDU-Chef Friedrich Merz heftige Kritik ein. Doch in den Umfragen verfestigt sich der Eindruck: Eine Quittung der Wähler muss die Union nicht fürchten.<br /></p>`,
                `<p>Mit Deepseek zieht eine KI aus China mit der US-Konkurrenz gleich – ähnlich gut, aber weitaus günstiger. Die Aktien vieler wichtiger Tech-Konzerne brechen ein. Bis zu einer Billion Euro Börsenwert ist vernichtet.<br /></p>`,
                `<p>Elon Musk streckt seinen rechten Arm bei einer politischen Kundgebung von Trump aus. Könnte es etwas anderes bedeuten? Die Neonazis glauben das nicht.<br /></p>`,
                `<p>Im vergangenen Jahr haben die USA weltweit rund 50 Milliarden Dollar für Entwicklungshilfe ausgegeben. Nun will die Regierung von Donald Trump weniger als 300 der 10.000 Mitarbeiter der zuständigen Behörde behalten.<br /></p>`
                
            ];
            
            const trainPosts5 = [
                `<p>Es wird heiß 🔥 Too Hot to Handle: Germany Staffel 2, jetzt ansehen.</p> <br />`,
                `<p>Freiburg und Mainz klettern auf die Plätze 4 und 5, RB Leipzig rutscht auf Platz 6 ab. 📈 Das ist die Tabelle nach dem 23. Spieltag. ⚽️<br /></p>`,
                `<p>CSU boss Söder warns of government formation with the SPD: The political situation is "historically difficult"-and Germany cannot stand up to a standstill.<br /></p>`,
                `<p>Die AfD ist künftig fast doppelt so stark im Bundestag vertreten, das Führungsduo der Abgeordneten bleibt. Auch die parteiintern umstrittenen Ultrarechten Maximilian Krah und Matthias Helferich werden Teil der Fraktion.<br /></p>`,
                `<p>Seit Asien vor Amerikas Handelskrieg zittert, gibt dort ein Land nach dem anderen Musks Satellitennetzwerk Starlink grünes Licht. Was steckt hinter diesem „Friedensangebot“?<br /></p>`,
                `<p>Hat Friedrich Merz' Entscheidung, in der Asyldebatte die Zustimmung der AfD in Kauf zu nehmen, der Union jetzt eigentlich genutzt? Geschadet hat es ihr jedenfalls wenig, schreibt @MMachowecz.<br /></p>`,
                `<p>Das Treffen Macrons mit Trump und das Uno-Abstimmungsverhalten der Europäer zeigen: Europa spielt in den Verhandlungen zwischen den USA und Russland nur noch eine Statistenrolle.<br /></p>`
                
            ];
            
            //Netflix
            //Sky Sport
            //Tagesspeigel
            //Der Speigel
            //faznet
            //zeit
            //handel
            
            
            
            const trainPosts = [
                `<p>Es wird heiß 🔥 Too Hot to Handle: Germany Staffel 2, jetzt ansehen.</p> <br />`,
                `<p>Die DFB-Team trifft im Halbfinale auf Portugal! 👀👇<br /><br />↪️ Hier seht ihr den Turnierbaum mit den vier Halbfinalisten der Nations League. Was glaubt ihr, wer am Ende den Wettbewerb gewinnt? 💬<br /></p>`,
                `<p>Die Festnahme von Istanbuls Bürgermeister İmamoğlu sorgt für Spannungen. Studierende fordern den Rücktritt von Präsident Erdogan, während die Oppositionspartei CHP landesweit Abstimmungen organisiert.<br /></p>`,
                `<p>Die künftige Regierung kann neue Schulden in Milliardenhöhe aufnehmen. Nach der Entscheidung im Bundestag hat nun auch die Länderkammer zugestimmt. Mehrere Ministerpräsidenten äußerten jedoch Bedenken.<br /></p>`,
                `<p>Am Donnerstag nahm der Kanzler an seinem mutmaßlich letzten Europäischen Rat teil. Nach drei Jahren einer lauwarmen Beziehung zu Europa wird ihn kaum jemand vermissen – ganz anders war das bei Merkels Abschied.<br /></p>`,
                `<p>"Assassin's Creed Shadows" soll den angeschlagenen Gameskonzern Ubisoft retten. Das historische Japan als Spielkulisse sieht zwar toll aus. Der Rest ist aber belanglos.<br /></p>`,
                `<p>Der US-Präsident geht mit Wutreden und Gesetzen gegen Programme zur Management-Vielfalt vor. Unternehmen ducken sich oder streichen Ziele. Auch deutsche Konzerne fürchten um Geschäfte.<br /></p>`
            ];
            
            
            const comments_Netflix = [
                "Das klingt nach einer interessanten Idee",
                "Ich bin gespannt, wie die deutsche Version ankommt",
                "Eine neue Reality-Show ist immer ein Gesprächsthema wert",
                "Ich frage mich, wer dabei sein wird",
                "Die Ankündigung klingt vielversprechend",
            ];
            const comments_Sky_Sports_DE = [
                "Interessant, wie sich die Tabelle entwickelt",
                "Ich warte auf den nächsten Spieltag",
                "Wie sehen deine Vorhersagen für die kommenden Spiele aus?",
                "Die Bundesliga ist immer wieder für Überraschungen gut",
                "Gute Zusammenfassung, danke!",
            ];
            const comments_Tagesspeigel = [
                "Interessant, wie sich die Situation in Berlin entwickelt",
                "Ich warte auf konkrete Lösungsvorschläge der Regierung",
                "Eine Analyse der Haushaltspläne wäre hilfreich",
                "Die Frage ist, welche Auswirkungen dies auf die Bürger haben wird",
                "Es bleibt abzuwarten, wie sich die politische Lage in Berlin weiterentwickelt.",
            ];
            const comments_Der_Speigel = [
                "Das ist ein interessantes Bild",
                "Ich würde gerne wissen, was er denn da macht",
                "Es sieht so aus, als ob er sich nicht sehr sicher fühlt",
                "Das sagt wohl mehr über ihn aus als über Kamala Harris",
                "Ich frage mich, wie das Publikum darauf reagiert."
            ];
            const comments_RKI1 = [
                "Ich werde das Video anschauen, um mehr über die Sicherheit von Impfstoffen zu erfahren",
                "Ich habe bereits davon gehört, dass mRNA nicht in die menschliche DNA integriert wird",
                "Das ist interessant, ich werde den Thread lesen",
                "Guter Beitrag, danke für die Info",
                "Ich wüsste gerne, wie oft solche Mythen entstehen und warum",
            ];
            
            //`<p>Kennen Sie schon die JitsuVAX-Webseite?</p>
            //<br />
            //<br />
            //<p>Dort werden die wichtigsten psychologischen Gründe erklärt, warum Menschen an Fehlinformationen glauben. Sie gibt Hilfestellung für Gespräche zu über 60 Impfthemen und ist jetzt auf Deutsch verfügbar! ➡️</p>`,
            
            const comments_RKI2 = [
            `<p>2/5</p>
            <br />
            <p>Obwohl mRNA-Impfstoffe relativ neu sind, gehören sie bereits zu den am besten untersuchten Medikamenten der Welt.</p>
             <br />
             <p>Es besteht kein erkennbares Risiko, dass die verimpfte mRNA in das Genom (DNA) von Körperzellen oder Keimbahnzellen (Eizellen oder Samenzellen) eingebaut wird.</p>`,
             
             `<p>3/5</p>
            <br /><p>mRNA-Impfungen sind eine relativ neue Technologie und wurden vielen Millionen Menschen innerhalb kurzer Zeit verabreicht. Eine gewisse Skepsis und Verunsicherung, welche Effekte das haben könnte, ist daher nachvollziehbar.</p>`,
             
            `<p>4/5</p>
            <br /><p>Wichtig zu wissen ist, dass mRNA (messenger RNA) natürlicherweise in jeder Zelle des menschlichen Körpers vorhanden ist – im sogenannten Zellplasma. Die menschliche DNA hingegen liegt immer im Inneren des Zellkerns. Dorthin gelangt die mRNA aus Impfstoffen jedoch nicht.</p>`,
             
            `<p>5/5</p>
            <br /><p>mRNA transportiert einen Teil des Bauplans des SARS-Coronavirus-2 ausschließlich in das Zellplasma, kann aber nicht in den Zellkern menschlicher Zellen eindringen.</p> 
            <br />
            <p>Fakt ist also: Die mRNA der Impfstoffe kann nicht in das Erbgut unserer Zellen eingebaut werden.</p>
            <br />
            <p>#ImpfenSchuetzt</p>`
                
        ];
            
            
            const trainPostsImg = [
                "620620_2.png",       //Netflix
                "023023_5.png",       //Sky Sport
                "146146_4.png",       //Tagesspeigel
                "070070_5.png",        //Der Speigel
                "faznet_3.png",     //faznet
                "zeit_p_3.png",       //zeit
                "handle_p_3.png",     //handel
            ];
            
            const userIds = [
                process.env.Netflix, //Netflix
                process.env.SkySport,   //Sky Sport
                process.env.Tagesspeigel,   //Tagesspeigel
                process.env.DerSpeigel,    //Der Speigel
                process.env.faznet,     //faznet
                process.env.zeit,      //zeit
                process.env.handle,     //handel
            ];
        
            const dummyPosts = [
                `<p>1/5</p><p>Impfmythen - kurz erklärt</p> <br /> <p>Neues Faktensandwich zum Thema Sicherheit</p> <br /> <p>Fakt ist: Die mRNA aus Impfstoffen wird nicht in die menschliche DNA eingebaut.</p><br /> <p>Details im Thread und unter: <a href="http://rki.de/impfmythen" target="_blank">➡️http://rki.de/impfmythen</a></p>`,
                `<p>Impfmythen - kurz erklärt</p> <br /> <p>Neues Faktensandwich zum Thema Sicherheit</p> <br /> <p>Fakt ist: Die mRNA aus Impfstoffen wird nicht in die menschliche DNA eingebaut.</p><br /> <p>Details im Thread und unter: <a href="http://rki.de/impfmythen" target="_blank">➡️http://rki.de/impfmythen</a></p>`,
                `<p>Impfmythen - kurz erklärt</p> <br /> <p>Neues Faktensandwich zum Thema Sicherheit</p> <br /> <p>Fakt ist: Die mRNA aus Impfstoffen wird nicht in die menschliche DNA eingebaut.</p> <br /><p>Details im Thread und unter: <a href="http://rki.de/impfmythen" target="_blank">➡️http://rki.de/impfmythen</a></p>`,
                `Immer mehr Menschen infizieren sich mit Mpox (auch Affenpocken). Neue Studien bestätigen, dass die Impfung zu 82 % wirksam gegen die Krankheit ist. Dennoch gibt es in der Forschung noch offene Fragen, z. B. wie lange der Schutz genau anhält und wie sich die Wirksamkeit bei neuen Varianten verändert. Eine Impfung wird empfohlen, um den bestmöglichen Schutz zu gewährleisten.`,
                 `Immer mehr Menschen infizieren sich mit Mpox (auch Affenpocken). Neue Studien bestätigen, dass die Impfung zu 82 % wirksam gegen die Krankheit ist. Eine Impfung wird empfohlen, um den bestmöglichen Schutz zu gewährleisten.`
            ];
        
            try {
                // Determine the version-specific post
                let selectedPost = dummyPosts[0];
                let linkToAdd = "default.png"; // Default thumbnail
                
                if (req.body.version === "1") {
                    selectedPost = dummyPosts[0];
                    linkToAdd = "post11.png";
                    
                } else if (req.body.version === "2") {
                    selectedPost = dummyPosts[0];
                    linkToAdd = "post11.png";
                    
                } else if (req.body.version === "3") {
                    selectedPost = dummyPosts[2];
                    linkToAdd = "post12.png";
                    
                } else if (req.body.version === "4") {
                    selectedPost = dummyPosts[3];
                    linkToAdd = "post13.png";
                    
                    
                } else if (req.body.version === "5") {
                    selectedPost = dummyPosts[4];
                    linkToAdd = "post14.png";
                    
                }
        
                const newPostData = {
                    userId:  process.env.RKI,
                    reactorUser:  req.body.userId?  req.body.userId:null,
                    pool: req.body.pool,
                    desc: selectedPost,
                    thumb: linkToAdd,
                };
        
                // Save the version-specific post
                //const savedPost = await createAndSavePost(newPostData);
                /*const shuffledBots = shuffleArray(botAccounts);
                
                if (req.body.version === "1" || req.body.version === "2") {
                    
                
                console.log("Posting comments!!!")
                const shuffledComments = shuffleArray(comments_RKI1);
                        
                        
                        var count = 0;
                        for (const item of shuffledComments) { 
                            const randomBot = await User.findById(shuffledBots[count]);
                            count = count + 1
                            const comment = new Comment({
                                body:item, 
                                userId:mongoose.Types.ObjectId(randomBot._id), 
                                postId:savedPost._id, 
                                username: randomBot.username
                            });
                            
                            try { 
                            
                                const savedComment = await comment.save();
                                await savedPost.updateOne({$push: { comments: savedComment } });
                                console.log("Comment saved successfully:", savedComment);
                                 
                            } catch (error) {
                                console.error("Error creating or saving comment:", error);
                                throw error;
                            }   
                        }
                } else*/ 
                // Add the version-specific post to the list
                trainPosts.push(newPostData.desc);
                userIds.push(process.env.RKI); // UserId for the new post
                trainPostsImg.push(newPostData.thumb);
                // Shuffle posts and userIds together
                const combined = trainPosts.map((post, index) => ({
                    post,
                    userId: userIds[index],
                    thumb:trainPostsImg[index]
                }));
                
                const shuffled = shuffleArray(combined);
                console.log(shuffled);
                
                // Save the shuffled posts
                for (const item of shuffled) {
                
                    let phtoAdd = "default.png"; // Default thumbnail
                    var isUserSelected = false;
                    
                    if (item.userId === userIds[0]) { 
                        phtoAdd = "620620.png";
                        isUserSelected = true; 
                    
                    } else if (item.userId === userIds[1]) {
                        phtoAdd = "023023.png";
                        isUserSelected = true; 
                    
                    } else if (item.userId === userIds[2]) { 
                        phtoAdd = "146146.jpg";
                        isUserSelected = true;
                    
                    } else if (item.userId === userIds[3]) { 
                        phtoAdd = "070070.png";
                        isUserSelected = true;
                    
                    } else if (item.userId === userIds[4]) { 
                        phtoAdd = "faznet_p.png";
                        isUserSelected = true;
                    
                    } else if (item.userId === userIds[5]) { 
                        phtoAdd = "zeit_p.png";
                        isUserSelected = true;
                    
                    } else if (item.userId === userIds[6]) { 
                        phtoAdd = "handle_p.png";
                        isUserSelected = true;
                    
                    }
                
                //if(isUserSelected == true){
                                
                    //const urls = extractUrls(item.post);                     
                    const newPost = {
                        userId: new mongoose.Types.ObjectId(item.userId),
                        reactorUser: mongoose.Types.ObjectId.isValid(req.body.userId)? new mongoose.Types.ObjectId(req.body.userId): null,
                        pool: req.body.pool,
                        desc: item.post,
                        thumb: item.thumb,
                    };
                    
                    const savedPost = await createAndSavePost(newPost);
                    
                    if (req.body.version === "1" && savedPost.userId == process.env.RKI) { 
                
                        console.log("Posting comments!!!")
                        console.log(req.body.version)
                        const shuffledComments = comments_RKI2;
                                
                                
                                var count = 0;
                                for (const it of shuffledComments) { 
                                    console.log(process.env.RKI)
                                    const isValidId = mongoose.Types.ObjectId.isValid(process.env.RKI);
                                        console.log("Is RKI a valid ObjectId?", isValidId);
                                        const randomBot = await User.findById(String(process.env.RKI));
                                        console.log(randomBot);
                                    count = count + 1
                                    const comment = new Comment({
                                        body:it, 
                                        userId: randomBot.id, 
                                        postId:savedPost.id, 
                                        username: randomBot.username
                                    });
                                    
                                    try { 
                                    
                                        const savedComment = await comment.save();
                                        await savedPost.updateOne({$push: { comments: savedComment } });
                                        console.log("Comment saved successfully:", savedComment);
                                         
                                    } catch (error) {
                                        logger.error('Error saving data', { error: error.message });
                                        console.error("Error creating or saving comment:", error);
                                        throw error;
                                    }
                                }
                        } 
                    
                    
                    /*console.log("Posting comments!!!")
                    console.log(item.userId)
                    console.log(savedPost._id)
                    
                    const shuffledBots = shuffleArray(botAccounts);
                    
                    
                    if (item.userId === "674a025cc36d80eed396b0eb") {  
                    
                        console.log("Posting comments!!!")
                        const shuffledComments = shuffleArray(comments_Netflix);
                        const currentUser = await User.findById(item.userId);
                        
                        console.log(item)
                        var count = 0;
                        for (const item of shuffledComments) { 
                            const randomBot = await User.findById(shuffledBots[count]);
                            count = count + 1
                            const comment = new Comment({
                                body:item, 
                                userId:mongoose.Types.ObjectId(randomBot._id), 
                                postId:savedPost._id, 
                                username: randomBot.username
                            });
                            
                            try { 
                            
                                const savedComment = await comment.save();
                                await savedPost.updateOne({$push: { comments: savedComment } });
                                console.log("Comment saved successfully:", savedComment);
                                 
                            } catch (error) {
                                console.error("Error creating or saving comment:", error);
                                throw error;
                            }
                            
                            
                        }
                    
                } else if (item.userId === "674a025dc36d80eed396b0ed") {  
                    console.log("Posting comments!!!")
                    console.log(item)
                    const shuffledComments = shuffleArray(comments_Sky_Sports_DE);
                        const currentUser = await User.findById(item.userId);
                        
                        var count = 0;
                        for (const item of shuffledComments) {
                        const randomBot = await User.findById(shuffledBots[count]);
                            count = count + 1
                            const comment = new Comment({
                                body:item, 
                                userId:mongoose.Types.ObjectId(randomBot._id), 
                                postId:savedPost._id, 
                                username: randomBot.username
                            });
                            try { 
                            
                                const savedComment = await comment.save();
                                await savedPost.updateOne({$push: { comments: savedComment } });
                                console.log("Comment saved successfully:", savedComment);
                                 
                            } catch (error) {
                                console.error("Error creating or saving comment:", error);
                                throw error;
                            }
                        }
                    
                    
                } else if (item.userId === "674a025dc36d80eed396b0ef") {  
                    console.log("Posting comments!!!")
                    console.log(item)
                    const shuffledComments = shuffleArray(comments_Tagesspeigel);
                        const currentUser = await User.findById(item.userId);
                        
                        var count = 0;
                        for (const item of shuffledComments) {
                            const randomBot = await User.findById(shuffledBots[count]);
                            count = count + 1
                            const comment = new Comment({
                                body:item, 
                                userId:mongoose.Types.ObjectId(randomBot._id), 
                                postId:savedPost._id, 
                                username: randomBot.username
                            });
                            try { 
                            
                                const savedComment = await comment.save();
                                await savedPost.updateOne({$push: { comments: savedComment } });
                                console.log("Comment saved successfully:", savedComment);
                               
                            } catch (error) {
                                console.error("Error creating or saving comment:", error);
                                throw error;
                            }
                        }
                    
                } else if (item.userId === "674a025ec36d80eed396b0f1") {  
                    console.log("Posting comments!!!")
                    console.log(item)
                    const shuffledComments = shuffleArray(comments_Der_Speigel);
                        const currentUser = await User.findById(item.userId);
                        
                        var count = 0;
                        for (const item of shuffledComments) {
                            const randomBot = await User.findById(shuffledBots[count]);
                            count = count + 1
                            const comment = new Comment({
                                body:item, 
                                userId:mongoose.Types.ObjectId(randomBot._id), 
                                postId:savedPost._id, 
                                username: randomBot.username
                            });
                            try { 
                            
                                const savedComment = await comment.save();
                                await savedPost.updateOne({$push: { comments: savedComment } });
                                console.log("Comment saved successfully:", savedComment);
                                 
                            } catch (error) {
                                console.error("Error creating or saving comment:", error);
                                throw error;
                            }
                        }
                } */
                //}
                }
        
                res.status(200).json({ success: true, message: "Posts created successfully!" });
            } catch (error) {
                logger.error('Error saving data', { error: error.message });
                console.error(error);
                res.status(500).json({ success: false, error });
            }
        });

    //repost a post
    router.post('/:id/repost', verifyToken, async(req, res) =>{
        logger.info('Data received', { data: req.body });
    try {

        const postRepost = new Repost({userId:req.body.userId, postId:req.params.id});
        await postRepost.save();
        //console.log(postRepost);
         console.log("postRepost is added");
         //const post = await Post.findById(req.params.id);
         await Post.findOneAndUpdate({"_id": req.params.id},{$push: { reposts: req.body.userId }});
        res.status(200).json('The post has been reposted!');

    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    console.log(err)
    }
    })


    //update a post
    router.put('/:id', verifyToken, async(req, res) =>{
        logger.info('Data received', { data: req.body });
    try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
    await post.updateOne({$set:req.body});
    res.status(200).json('The post has been updated');
    } else {
    res.status(403).json('You can only update your post!');
    }
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    })

    // notification
    router.post('/subscribe', verifyToken,  async(req, res) =>{
        logger.info('Data received', { data: req.body });
    console.log(req);
    const newSubscription = await Subscription.create ({...req.body});
    const options = {
    vapidDetails: {
    subject: 'mailto:myemail@example.com',
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    },
    };
    console.log(req.body)
    console.log(options)
    console.log(newSubscription.endpoint)
    try {
    const res2 = await webPush.sendNotification (
    newSubscription,
    JSON.stringify ({
    title: 'Hello from server',
    description: 'this message is coming from the server',
    image: 'https://cdn2.vectorstock.com/i/thumb-large/94/66/emoji-smile-icon-symbol-smiley-face-vector-26119466.jpg',
    }),
    options
    );
    console.log(res2);
    res.sendStatus(200);
    } catch (error) {
    console.log (error);
    res.sendStatus (500);
    }
    });

    router.post('/fetch-thumbnail', verifyToken, async (req, res) => {
        const { url } = req.body;
        try {
            //console.log(req.body.urls);
    
            // First, check if the local file exists
            const localImagePath = path.join(process.cwd(), 'public', 'images', req.body.urls); // Assuming the filename is provided in req.body.urls
            const localThumbnailUrl = `${req.protocol}://${req.get('host')}/images/${req.body.urls}`;
            console.log("here");
            console.log(localImagePath);
            console.log(localThumbnailUrl);
    
            if (fs.existsSync(localImagePath)) {
                // If the file exists locally, return the local URL
                
                const imageBuffer = fs.readFileSync(localImagePath);
                const base64Image = imageBuffer.toString('base64');
            
            // Send the base64 string as the thumbnail in the response
            return res.json({ 
                thumbnail: `data:image/png;base64,${base64Image}` // Assuming it's a PNG, adjust accordingly
            });
            }else{
    
            // If the file doesn't exist locally, proceed with scraping using Cheerio
            const { data } = await axios.get(req.body.urls);  // Scraping the URL
            const $ = cheerio.load(data);
    
            // Extract Open Graph image
            const thumbnail = $('meta[property="og:image"]').attr('content');
    
            if (thumbnail) {
                // If a thumbnail is found, return the online URL
                return res.json({ thumbnail });
            } else {
                // If no thumbnail is found, return an error
                return res.status(404).json({ error: 'Thumbnail not found online or locally' });
            }
        }
    
        } catch (error) {
            //console.error(error);
            res.status(500).json({ error: 'Error fetching thumbnail' });
        }
    });


    // delete a post
    router.delete('/:id', verifyToken, async(req, res) =>{
        logger.info('Data received', { data: req.body });
    try {
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId) {
    await post.deleteOne();
    res.status(200).json('The post has been deleted');
    } else {
    res.status(403).json('You can only delete your post!');
    }
    } catch(err) {
    res.status(500).json(err);
    }
    })


    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /:id/like:
     *   put:
     *     summary: Like or dislike a post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: post id
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: user id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: The post is liked or disliked by you!
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Post'
     *       500:
     *         description: Some server error!
     */

    function waitForOneSecond() {
        setTimeout(() => {
          // Code to execute after 1 second
          console.log('One second has passed!');
        }, 1000); // 1000 milliseconds = 1 second
      }


// like a post
router.put('/:id/like', verifyToken, async(req, res) => {
    logger.info('Data received', { data: req.body });

    //const post = await Post.find({"_id":req.params.id,"PostLike.userId": ObjectId(req.body.userId), "PostDislike.userId": ObjectId(req.body.userId)}, {"PostLike.$": 1,"PostDislike.$": 1 }).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
    const post = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike", match: { "userId": req.body.userId}}, {path : "dislikes", model: "PostDislike", match: { "userId": req.body.userId}}]).sort({ createdAt: 'descending' }).exec();
    //const posttoReturn = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         
    console.log("Disliked objects");
    console.log(post.dislikes.length);
 
    //const likedObj = await PostLike.find({"postId": req.params.id, "userId" : req.body.userId})
    console.log("Liked objects");
    console.log(post.likes.length);
 
    var isAlreadyLiked = false;
    var isAlreadyDisliked = false;
 
    if(post.likes.length > 0){
     isAlreadyLiked = true
     try {
        console.log("LIKE - 1");
         const idl = new ObjectId(post.likes[0]._id)
         await Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'likes': {$in: [idl]}}});
         const dltobj = await PostLike.findByIdAndDelete({_id:idl});
         const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         //console.log(post2);
         var diction = {"likes": -1, "dislikes": parseInt(0)}
         res.status(200).json(diction);
     } catch(err) {
        logger.error('Error saving data', { error: err.message });
         console.log(err);
         res.status(500).json(err);
        }
    } 
 
    else if(post.dislikes.length > 0){
     isAlreadyDisliked = true
     try{
        console.log("LIKE - 2");
         const idl = new ObjectId(post.dislikes[0]._id)
         await Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'dislikes': {$in: [idl]}}});
         const dltobj = await PostLike.findByIdAndDelete(idl );
         const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         //console.log(post2);
         var diction = {"likes": parseInt(0), "dislikes":-1 }
         res.status(200).json(diction);
     }catch(err) {
        logger.error('Error saving data', { error: err.message });
         res.status(500).json(err);
     
        }
    }
 
    if(!isAlreadyLiked){
     if(!isAlreadyDisliked){
     try {
        console.log("LIKE - 3");
         const postLike = new PostLike({userId:req.body.userId, postId:req.params.id});
         await postLike.save();
         console.log(postLike);
         console.log("postLike is added");
         //const post = await Post.findById(req.params.id);
         await Post.findOneAndUpdate({"_id": req.params.id},{$push: { likes: postLike }});
         const post2  = await Post.findById(req.params.id, { upsert:true, new: true }).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         //console.log(post2);
         var diction = {"likes": 1, "dislikes":parseInt(0) }
         res.status(200).json(diction);
 
     } catch(err) {
        logger.error('Error saving data', { error: err.message });
         console.log(err);
         res.status(500).json(err);
 
     }
 }else{
     console.log("Both are not false");
     console.log(isAlreadyLiked);
     console.log(isAlreadyDisliked);
 }
     }else{console.log(isAlreadyLiked);
     }
 });
 
 // dislike a post
 router.put('/:id/dislike', verifyToken, async(req, res) =>{
    logger.info('Data received', { data: req.body });
 
     const post = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike", match: { "userId": req.body.userId}}, {path : "dislikes", model: "PostDislike", match: { "userId": req.body.userId}}]).sort({ createdAt: 'descending' }).exec();
     console.log("Disliked objects");
     console.log(post.dislikes.length);
  
     //const likedObj = await PostLike.find({"postId": req.params.id, "userId" : req.body.userId})
     console.log("Liked objects");
     console.log(post.likes.length);

     var isAlreadyLiked = false;
     var isAlreadyDisliked = false;
  
     if(post.likes.length > 0){
        const idd = post.likes[0]._id
         isAlreadyLiked = true
         try {
            
            console.log("DISLIKE - 1");
            const idl = new ObjectId(idd);
            await Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'likes': {$in: [idl]}}});
            const dltobj = await PostLike.findByIdAndDelete({_id:idl} );

             const post = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
             console.log(post);
             var diction = {"likes": -1, "dislikes": parseInt(0)}
            res.status(200).json(diction);
             
             
         } catch(err) {
            logger.error('Error saving data', { error: err.message });
             console.log(err);
             res.status(500).json(err);
            }
        } else if(post.dislikes.length > 0){
         isAlreadyDisliked = true
         try{
            console.log("DISLIKE - 2");
             const idl = new ObjectId(post.dislikes[0]._id)
             await Post.findOneAndUpdate({_id: req.params.id}, {$pull: {'dislikes': {$in: [idl]}}});
             const dltobj = await PostLike.findByIdAndDelete(idl);
             const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
             console.log(post2);
             var diction = {"likes": parseInt(0), "dislikes":-1 }
            res.status(200).json(diction);
             
         }catch(err) {
            logger.error('Error saving data', { error: err.message });
             res.status(500).json(err);
         
            }
        }
 
     if(!isAlreadyLiked){
         if(!isAlreadyDisliked){
         try {
        console.log("DISLIKE - 3");
         const postDislike = new PostDislike({userId:req.body.userId, postId:req.params.id});
         await postDislike.save();
         console.log(postDislike);
         console.log("postDislike is added");
 
         const post = await Post.findById(req.params.id);
         await post.updateOne({$push: { dislikes: postDislike } });
         const post2 = await Post.findById(req.params.id).populate([{path : "likes", model: "PostLike"}, {path : "dislikes", model: "PostDislike"}]).sort({ createdAt: 'descending' }).exec();
         console.log(post2);
         var diction = {"likes": parseInt(0), "dislikes": 1}
         res.status(200).json(diction);
     } catch(err) {
        logger.error('Error saving data', { error: err.message });
         console.log(err);
         res.status(500).json(err);
     }
 }else{

     console.log("Both are not false");
     console.log(isAlreadyLiked);
     console.log(isAlreadyDisliked);
 }
     }else{console.log(isAlreadyLiked);
     }
 });

    // like a post
    router.put('/:id/like2', verifyToken,async(req, res) =>{
    try {
    // Like a post
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)) {
    await post.updateOne({$push: { likes: req.body.userId } });
    res.status(200).json('The post has been liked!');
    } else {
    // Dislike a post
    await post.updateOne({$pull: { likes: req.body.userId } });
    res.status(403).json('The post has been disliked!');
    }
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    })

    // like a post
    router.put('/:id/dislike2', verifyToken, async(req, res) =>{
    try {
    // Dislike a post
    const post = await Post.findById(req.params.id);
    if(!post.dislikes.includes(req.body.userId)) {
    await post.updateOne({$push: { dislikes: req.body.userId } });
    res.status(200).json('The post has been disliked!');
    } else {
    // Dislike a post
    await post.updateOne({$pull: { dislikes: req.body.userId } });
    res.status(403).json('The post has been disliked!');
    }
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    })


    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /:id:
     *   get:
     *     summary: Fetch a post
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: post id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: Here is the post
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Post'
     *       500:
     *         description: Some server error!
     */


// readSpecialPost a post
router.post('/UserReadSpecialPost', verifyToken, async(req, res) => {
    logger.info('Data received', { data: req.body });
    try {
    await User.findOneAndUpdate({"_id": req.body.userId},{$push: { readSpecialPosts: req.body.postId}});
    res.status(200).json('The post has been added to special reading!');
  }catch(err) {
    logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
}

 });


    // get a post
    router.get('/:id',verifyToken,  async(req, res) =>{ //verifyToken, 
        logger.info('Data received', { data: req.body });
        console.log(req.params.id)
    try {
    const post = await Post.findById(req.params.id).populate({path : 'comments', model:'Comment', populate:[{path : "userId", model: "User"}, {path: "likes", model: "CommentLike"}, {path: "dislikes", model: "CommentDislike"}, { path: 'reposts', model: 'Repost', populate: { path: 'userId', model: 'User' }}]}).exec();
    console.log("post")
    console.log(post)
    res.status(200).json(post);
    
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    })

    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /timeline2/:userId:
     *   get:
     *     summary: Fetch posts of a user and his/her followings
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: user id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: The post is created!
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error!
     */


    // get all posts
    router.get('/timeline2/:userId', verifyToken, async(req, res) =>{
    try {
    const currentUser = await User.findById(req.params.userId).populate('Comment').exec();
    const userPosts = await Post.find({ userId: currentUser._id });

    const friendPosts = await Promise.all(
    currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId }).populate('Comment').exec();
    })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    })

    // get pagination posts
    router.get('/timelinePag/:userId', verifyToken,  async(req, res) =>{ 
        logger.info('Data received', { data: req.body });
    console.log(req.query.page);
    console.log(req.headers['userid']);
    try {
    let page = req.query.page //starts from 0
    let userId = req.headers['userid']
    let posts= await getPostsPaginated(page, userId) 
    console.log(posts.length)
    if (posts && posts.length > 0) {
        res.status(200).json(posts)
    } else {
        res.status(200).json(err);
        console.log(res);
    }

    } catch(err) {
        logger.error('Error saving data', { error: err.message });
        res.status(500).json(err);
    }
    })


    //service
    const getPostsPaginated = async (page, userId) => {
    let resultsPerPage = 20
    
    const currentUser = await User.findById(userId)
    console.log(currentUser)
    console.log(currentUser.id)
    const txt = Post.find({ "userId":   currentUser.id})
    console.log("txt[0]")
    console.log(txt[0])
    
    const posts = await Post.find({$or: [ { "reactorUser":   userId },{ "userId":   currentUser.id }]})
    .populate({path : 'comments', model:'Comment', populate:[{path : "userId", model: "User"}, {path: "likes", model: "CommentLike"}, {path: "dislikes", model: "CommentDislike"}]})
    .sort({ createdAt: -1 })
    //.lean()
    .skip(page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    console.log(posts.length);
    return posts;
    }

    // all users
    router.get('/timeline/:userId', verifyToken, async (req, res) => {
        logger.info('Data received', { data: req.body });
    try {
    let postList = [];
    Post.find({}, function(err, posts) {
    console.log(posts.length)
    //res.send(userMap);
    res.status(200).json(posts)
    }).populate('comments').exec();
    }
    catch (err) {
        logger.error('Error saving data', { error: err.message });
    //console.log(err)
    res.status(500).json(err);
    }
    });

    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /onlyFollowers/:userId:
     *   get:
     *     summary: Fetch posts of only followers!
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: user id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: Here are the posts by your followers!
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error!
     */

    // post of only follower
    router.get('/onlyFollowers/:userId', verifyToken, async (req, res) => {
        logger.info('Data received', { data: req.body });
    try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();

    const friendPosts = await Promise.all(
    currentUser.followers.map((friendId) => {
        return Post.find({ userId: friendId });
    })
    );
    //console.log(friendPosts.length)

    res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    });

    //service
    const getPostsPaginatedFollowers = async (page, req) => {
    let resultsPerPage = 20
    const currentUser = await User.findById(req.params.userId);
    //const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();
    let userPosts = []
    const friendPosts = await Promise.all(
    currentUser.followers.map((friendId) => {
    return Post.find({ userId: friendId })
    .populate({path : 'comments', populate:{path : "userId", model: "User"}})
    .sort({ createdAt: 'descending' })
    //.lean()
    .skip(page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    }))

    //console.log([].concat(...friendPosts))
    //const filtPost =  follPosts.sort({ createdAt: 'descending' }).lean().limit(resultsPerPage).skip(page * resultsPerPage)
    return [].concat(...friendPosts)
    }

    // post of only follower
    router.get('/onlyFollowersPag/:userId', verifyToken, async (req, res) => {
        logger.info('Data received', { data: req.body });
    console.log("hereherehereh");
    console.log(req.query.page);

    try {
    let page = req.query.page //starts from 0
    let posts= await getPostsPaginatedFollowers(page, req)

    if (posts && posts.length > 0) {
    res.status(200).json(posts)
    } else {
    res.status(200).json(posts);
    //console.log(res);
    }

    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    //console.log(err);
    res.status(500).json(err);
    }
    });


   // posts of only followings
   router.get('/:id/getUserPost/', verifyToken, async (req, res) => {
    logger.info('Data received', { data: req.body });
    try {
    
        console.log("getUserPost");
        console.log(req.params.id);
        const currentUser = await User.findById(req.params.id);
        console.log(currentUser);
        
        const existingSurvey = await PostSurvey.findOne({ userId: currentUser.id });
        if (existingSurvey) {
            return res.status(200).json({  message:  existingSurvey.prolific_code, message2: "User has already submitted a post-survey." });
        }
        
        const userPosts = await Post.find({ reactorUser: currentUser._id, thumb: { $regex: /post/i }}).populate('comments').exec();
        console.log(userPosts);
        res.status(200).json(userPosts);
    
    } catch(err) { 
        logger.error('Error saving data', { error: err.message });
        console.log(err);
        res.status(500).json(err);
    }
    });


    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /onlyFollowings/:userId:
     *   get:
     *     summary: Fetch posts of only followings!
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *           type: string
     *         required: true
     *         description: user id
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: Here are the posts by your followings!
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error!
     */

    //service
    const getPostsPaginatedFollowings = async (page, req) => {
    let resultsPerPage = 20
    const currentUser = await User.findById(req.params.userId);
    //const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();

    const friendPosts = await Promise.all(
    currentUser.followings.map((friendId) => {
    return Post.find({ userId: friendId })
    .populate({path : 'comments', populate:{path : "userId", model: "User"}})
    .sort({ createdAt: 'descending' })
    //.lean()
    .skip(page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    }))

    let userPosts = []
    userPosts.concat(...friendPosts)
    //console.log([].concat(...friendPosts));
    //const filtPost =  follPosts.sort({ createdAt: 'descending' }).lean().limit(resultsPerPage).skip(page * resultsPerPage)
    return [].concat(...friendPosts)
    }

    // posts of only followings
    router.get('/onlyFollowingsPag/:userId', verifyToken, async (req, res) => {
        logger.info('Data received', { data: req.body });
    try {
    let page = req.query.page 
    const currentUser = await User.findById(req.params.userId);
    let posts= await getPostsPaginatedFollowings(page, req)
    if (posts && posts.length > 0) {
    res.status(200).json(posts)
    } else {
    res.status(200).json(posts);
    //console.log(res);
    }

    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    //console.log(err);
    res.status(500).json(err);
    }
    });

    // posts of only followings
    router.get('/onlyFollowings/:userId', verifyToken, async (req, res) => {
        logger.info('Data received', { data: req.body });

    try {
    let page = req.query.page //starts from 0
    let posts= await getPostsPaginatedFollowings(page)
    if (posts && posts.length > 0) {
    res.status(200).json(posts)
    } else {
    //res.status(200).json("error");
    console.log(res);
    }

    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }


    try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id }).populate('Comment').exec();

    const friendPosts = await Promise.all(
    currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId }).populate('Comment').exec();
    })
    );
    //console.log(friendPosts.length)      
    res.status(200).json(userPosts.concat(...friendPosts));
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    }
    });

    /**
     * @swagger
     * tags:
     *   name: Posts
     *   description: The posts managing APIs
     * /onlyFollowings/:userId:
     *   get:
     *     summary: Fetch all of your posts!
     *     tags: [Posts]
     *     parameters:
     *       - in: path
     *         name: username
     *         schema:
     *           type: string
     *         required: true
     *         description: username
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: Here is the list of your posts!
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       500:
     *         description: Some server error!
     */

    // get all posts of a user
    router.get('/profile/:username', verifyToken, async(req, res) =>{
        logger.info('Data received', { data: req.body });
    try {
    let resultsPerPage = 20
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({userId: user._id})
    .populate({path : 'comments', populate:{path : "userId", model: "User"}})
    .sort({ createdAt: 'descending' })
    //.lean()
    .skip(req.query.page * resultsPerPage)
    .limit(resultsPerPage)
    .exec()
    res.status(200).json(posts);
    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    res.status(500).json(err);
    console.log(err);
    }
    });

    // get all comments

    // add a comment
    router.post('/:id/comment', verifyToken, async(req, res) => {
        logger.info('Data received', { data: req.body });
        console.log(req.body.userId)
        const user = await User.findOne({_id:req.body.userId});
        console.log(user)
    const comment = new Comment({body:sanitizeInput(req.body.txt), userId:user._id, postId:req.body.postId, username: req.body.username});
    try{
    await comment.save();
    const post = await Post.findById(req.body.postId);
    await post.updateOne({$push: { comments: comment } });
    const comm = await Comment.findOne({postId: req.body.postId}).sort({ createdAt: 'descending' })
    //post.comments.findOne(sort=[('$natural', DESCENDING)]);
    //await post.comments.push(comment);

    //await post.save(function(err) {
    //    if(err) {
    //        console.log(err)
    //    }
    //    });
    //await post.updateOne({_id:req.body.postId}, {$push: {comments:comment}});
    res.status(200).json(comm);

    } catch(err) {
        logger.error('Error saving data', { error: err.message });
    console.log(res.status(500).json(err));
    }
    // create a comment
    /* console.log(req.body.postId)
    console.log(req.body.txt)
    console.log(req.body.userId)
    //const post = await Post.findById(req.params.id);
    try{
    let result = await Post.findOneAndUpdate({_id:req.body.postId}, {Comment: {body: req.body.txt, userId:req.body.userId, postId:req.body.postId}},
            function(err,post){
                if (err || !post) {
                    console.log(res.json({ error: err }));
                }
            }
        )
    } catch(err) {
    console.log(err)
    console.log(res.status(500).json(err));
    }*/
    });

    router.get('/:userId/getSpecialPosts', verifyToken, async(req, res) =>{
        logger.info('Data received', { data: req.body });
        try {
            // Step 1: Find the current user and check their pool
            const currentUser = await User.findById(req.params.userId).populate('readSpecialPosts', '_id pool');   
            console.log("getSpecialPosts");
            
            let specialPostsInPool;
            specialPostsInPool = await SpecialPost.find({ version: currentUser.pool });
            console.log("specialPostsInPool");
            console.log(specialPostsInPool);
            
            const specialPostIdsInPool = specialPostsInPool.map(post => post._id.toString());
            console.log(specialPostIdsInPool);
            const readPostIds = currentUser.readSpecialPosts.map(post => post._id.toString());
            console.log(readPostIds);

            const unreadPostId = specialPostIdsInPool.find(postId => !readPostIds.includes(postId));
            console.log(unreadPostId);
        
            let unreadPost;
            if (unreadPostId) {
              // Fetch details of the next unread post in the same pool
              unreadPost = await SpecialPost.findById(unreadPostId);
            }
        
            // Step 4: Return the unread post or first post as fallback
            if (unreadPost) {
              return res.status(200).json(unreadPost);
            } else {
              return res.status(200).json([]);
            }
          } catch (err) {
            logger.error('Error saving data', { error: err.message });
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
          }
        });


    // delete a comment
    // delete a post

    module.exports = router;}