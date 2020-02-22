const clientID = '342855497987-mf8hfguj85hqtvhn9ncrgvnrtler1v1o.apps.googleusercontent.com';
const clientSecret = 'ewBG9qwJ2wmwiC61HP5FpHPe';

if(process.env.NODE_ENV != 'production') 
    require('dotenv').config();
    //const{port}=config.PORT;
    //console.log(port);

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.ENV || 'development',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbCluster: process.env.DB_CLUSTER,
    get dbUrl() {
        return `mongodb+srv://${this.dbUser}:${this.dbPassword}@${this.dbCluster}.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
        },

        production: {

        },

        development:{

        }
};


//export de variables
module.exports.clientID = "342855497987-mf8hfguj85hqtvhn9ncrgvnrtler1v1o.apps.googleusercontent.com";
module.exports.clientSecret = 'ewBG9qwJ2wmwiC61HP5FpHPe';
