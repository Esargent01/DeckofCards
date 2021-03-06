var app = angular.module('PokerDeck', []);

app.service('Deck', [function (){
	var deck = [];
	var suits = ['hearts', 'diams', 'spades', 'clubs'];
	var ranks = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

	this.makeDeck = function(){
		for (i=0; i<suits.length; i++) {
	        for (j=0; j<ranks.length; j++) {
	            deck.push({'card':('rank-' + ranks[j] + ' ' + suits[i]), 'value':(ranks[j]) });
	        }
	    }
	    return deck;
	};

	this.resetDeck = function(){
		deck = [];
	    return deck;
	};
}]);

app.controller('DeckCtrl',['$scope', '$timeout', 'Deck', function ($scope, $timeout, Deck){
	
	$scope.deck = Deck.makeDeck();
	$scope.drawn = [];
	$scope.shuffling = false;

    $scope.shuffle = function(o){
	    for(var j, x,
    	i = o.length; i; 
    	j = Math.floor(Math.random() * i), 
    	x = o[--i], o[i] = o[j], o[j] = x);

	    $scope.shuffling = true;
		$timeout(function() {
			$scope.shuffling = false;
		}, 600);

        return o;
	};

	$scope.dealOneCard = function(){
		if ($scope.drawn.length < 52) {
			$scope.drawn.push($scope.deck[0]);
			$scope.deck.shift();
		}
	};

	$scope.reset = function(){
		$scope.deck = Deck.resetDeck();
	    $scope.deck = Deck.makeDeck();
	    $scope.drawn = [];
	};

}]);