import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './DexEntry.css';
import { Link, Router} from 'react-router';

/*
	Dex entries over here...

*/

function DexEntries(lang,gen,dex){
	var language = lang;
	var generation = gen;
	var collectedGames = [];
	var collectedDex = [];

	var gamegens = [
			{'gen':'generation-i',
			  'games':[
			  		'red',
			  		'blue',
			  		'yellow'
			  	]
			  },
			{'gen':'generation-ii',
			  'games':[
			  		'gold',
			  		'silver',
			  		'crystal'
			  	]
			  },
			{'gen':'generation-iii',
			  'games':[
			  		'ruby',
			  		'sapphire',
			  		'emerald',
			  		'firered',
			  		'leafgreen'
			  	]
			  },
			{'gen':'generation-iv',
			  'games':[
			  		'diamond',
			  		'pearl',
			  		'platinum',
			  		'heartgold',
			  		'soulsilver'

			  	]
			  },
			{'gen':'generation-v',
			  'games':[
			  		'black',
			  		'white',
			  		'black-2',
			  		'white-2'
			  	]
			  },
			{'gen':'generation-vi',
			  'games':[
			  		'x',
			  		'y',
			  		'alpha-sapphire',
			  		'omega-ruby'
			  	]
			  },
			



	];

	/*
		Filters by dex entries by generation

	*/
	
	for(var x=0; x < gamegens.length; x++){
		if(generation == gamegens[x].gen){
			for(var y=0;y < gamegens[x].games.length; y++){
				collectedGames.push(gamegens[x].games[y]);
			}
		}
	}


	/*
		Filters by language

		***API ONLY HAS ENGLISH TRANSLATIONS AND GEN 6 MULTI LANGUAGE ENTRIES. ***
	
	*/
	for(var z=0; z < dex.length; z++){
		if(dex[z].language.name == language){
			

			for(var q=0; q < collectedGames.length; q++){
			
				if(dex[z].version.name == collectedGames[q]){
					
					collectedDex.push({'text':dex[z].flavor_text,'version':collectedGames[q]});
					
						
				} else {
					console.log('didn\'t find game');
					
				}

			}
		}
	}
	if(language != 'en' && collectedDex.length == 0){
		console.log('no entries for '+ language);

		collectedDex.push({'text':'Current API does not support this language yet... ','version':'N/A... Try Gen 6 or above'});
	} 
	
	var readyDex = collectedDex.reverse();
	console.log(collectedDex);
	console.log(language);
	var dextext = [];

	for(var x=0;x < collectedDex.length; x++){
		var div = 	<div id={'dex-entry'+x} className='col-xs-12 col-sm-6 col-md-6 col-lg-6 dex-entries'>
								<div id='innerdex'className='col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1'>
							
									<div id={'dex-entry-text'+x}className='col-xs-12 col-sm-12 col-md-12 col-lg-12 dex-entries-text'>
						
								{collectedDex[x].text}
						
							</div>
							<div id={'dex-entry-version'+x}className='col-xs-12 col-sm-12 col-md-12 col-lg-12 dex-entries-versions'>
							
								From : Pokemon {collectedDex[x].version}
							
							</div>
							
							
								</div>
							
						
				
		
			</div>;

			dextext.push(div);
		
	}

	return dextext;
	
	
}



/*
	Shown component
	
*/
class DexEntry extends Component {
	constructor(){
		super();
		this.state = {
			currentLang: 'en',
			currentColor:'#BF221E',

		};
		this.handleClick = this.handleLangClick.bind(this);
		this.handleGenClick = this.handleGenClick.bind(this);
	}
	handleLangClick(event){

		this.setState({
			currentLang: event.code,
			currentColor: event.color
		})

		

	}
	handleGenClick(event){
		this.setState({
			currentGen: event
		})
	}
	componentDidMount() {
		this.setState({
			currentGen: this.props.pokemondex.generation.name
		})
	}
	render(){

		/*
			Language keycodes and colors
		*/

		var langs = [
			{'code':'en','lang':'English','color':'#BF221E'},
			{'code':'ja','lang':'Japanese','color':'#717372'},
			{'code':'roomaji','lang':'Romaji','color':'#636B73'},
			{'code':'ko','lang':'Korean','color':'#455173'},
			{'code':'zh','lang':'Chinese','color':'#F26A35'},
			{'code':'fr','lang':'French','color':'#27A1B2'},
			{'code':'de','lang':'German','color':'#3D5E66'},
			{'code':'es','lang':'Spanish','color':'#B25B51'},
			{'code':'it','lang':'Italian','color':'#07663E'},
			{'code':'cs','lang':'Czech','color':'#B2A480'},
			{'code':'ja-kanji','lang':'Kanji','color':'#B2A0A4'}

		];

		/*
			Which generations the pokemon contain and origin generation

			***ONLY SHOWS UP TO 6TH GENERATION DUE TO API***
		*/

		var gens = [
			{'gen':'generation-i','name':'I'},
			{'gen':'generation-ii','name':'II'},
			{'gen':'generation-iii','name':'III'},
			{'gen':'generation-iv','name':'IV'},
			{'gen':'generation-v','name':'V'},
			{'gen':'generation-vi','name':'VI'},
			
		];

		var generation = this.props.pokemondex.generation.name;

		var collectedGen = [];

		console.log(generation);
		var dexstuff = this.props.pokemondex.flavor_text_entries;

		
		var pokemonlanguages = this.props.pokemondex.names;
		var currentlangselection = [];
		var self = this;


		/*
			Sets filter parameters by language.

			Some pokemon may not have the language available. This filters it in selection first.
			

			Refactor for later: I... have no clue why I made this return as an array instead as an object.

			
		*/
		for(var x = 0; x < pokemonlanguages.length; x++){
			for(var y=0;y < langs.length; y++){
				if(pokemonlanguages[x].language.name == langs[y].code){
					currentlangselection.push([langs[y].lang,langs[y].code,langs[y].color]);
				}
			}
		}
		/*
			Sets filter parameters by the generation the pokemon first appeared and adds the ones it has shown in. 
		
		*/
		for(var x=0; x< gens.length;x++){
			if(gens[x].gen == generation){
				collectedGen.push(gens[x]);
				for(var y=x+1;y < gens.length; y++){
					collectedGen.push(gens[y]);
				}
			}
		}

		
		/*
			Changes the color based on language selected.

			Default is English/Red (Colors will changed for better a e s t h e t i c )
		*/
		var dexStyle = {
			background: this.state.currentColor
		}

		


		return(
					<div id='dex-entry'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
							<div id='language-selection-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'>
									{
										currentlangselection.map(function(key,id){
											let langObject = {'code':key[1],'color':key[2]}
											let styleObject = {
												background:langObject.color
											}



											return (

														<div key={key}id={'lang-selection-'+id} className='col-xs-6 col-sm-6 col-md-1 col-lg-1 langs' onClick={(event)=>self.handleLangClick(langObject,event)} style={styleObject}>
													
															{key[0]}
													
														</div>
													




												)



										})

									}
								
						
							</div>
								<div id='dex-info-entry-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12' style={dexStyle}>
							
									  	<div id='generation-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12 generation-wrappers'>
									  
									  		 	<div id='generation-title'className='col-xs-12 col-sm-12 col-md-2 col-lg-2 generation-titles'>
									  		 
									  		 		Generation:
									  		 
									  		 	</div>
									  		 	{
									  		 		collectedGen.map(function(key,id){
									  		 			

									  		 			if(key.gen == self.state.currentGen){

									  		 				var styleObject = {
									  		 					background:'black'
									  		 				};


									  		 				return (
									  		 						<div style={styleObject}key={id}id=''className='col-xs-2 col-sm-2 col-md-1 col-lg-1 generations' onClick={(event)=>self.handleGenClick(key.gen,event)} >
									  		 					
									  		 							{key.name}
									  		 					
									  		 						</div>
									  		 					

									  		 				)

									  		 			} else {
									  		 				return (
									  		 						<div key={id}id=''className='col-xs-2 col-sm-2 col-md-1 col-lg-1 generations' onClick={(event)=>self.handleGenClick(key.gen,event)} >
									  		 					
									  		 							{key.name}
									  		 					
									  		 						</div>
									  		 					

									  		 				)
									  		 			}


									  		 		})


									  		 	}


									  		 
									  
									  	</div>
									  	<div id='generation-content-wrapper'className='col-xs-12 col-sm-12 col-md-12 col-lg-12'style={dexStyle}>
									  	
									  			{DexEntries(this.state.currentLang,this.state.currentGen,dexstuff)}
									  	
									  	</div>
									  	
									  
							
								</div>
							
						
				
					</div>
				

			)


	}

}

export default DexEntry;