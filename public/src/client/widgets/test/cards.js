"use strict";

define("forum/widgets/test/cards", [], function () {

    const Card = {};
    const Logger = new ConsoleLogger('CARDS');



    /**
     * Initialize the Card.
     */
    Card.init = async function () {
        Logger.log('init');

    }

 
    return Card;

});
