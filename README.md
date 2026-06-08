# Blaseball: Player's Choice

This is a project attempting to re-create the main functionality of blaseball, along with giving the user the chance to edit teams, players, and the assigned modifications. 

Unlike projects like [Resim](https://github.com/xSke/resim) or [Sandbox](https://github.com/Society-for-Internet-Blaseball-Research/sandbox) this sim will _not_ be a perfect match for the flow following TGB's initial design. Rather, this is attempting to be Blaseball-enough for the purposes of allowing editability on the users end.

## Set Up

TODO: Once is launchable state, create a how to set up

1. Install dependencies
2. Create database
3. Set up .env
4. Start server
5. Start front end

## References

There are other projects that have been used in part, or heavily references while working on creating this project.

- [Datablase](https://github.com/Society-for-Internet-Blaseball-Research/docs/blob/master/docs/z-datablase-guest-access.md)
- [Blaseball API Reference](https://api.blaseball-reference.com/docs)
- [Resim](https://github.com/xSke/resim/blob/main/formulas.py)


## Progress Tracking

Planned workflow:

- [ ] Create a basic baseball sim
    - [ ] Create game logic
    - [ ] Create components of play
        - [ ] Create teams function
        - [ ] Create players function
        - [x] Assign game order
    - [ ] Handle post season and assign championship
- [ ] Create test suites to run whenever the program is compiled
    - [ ] Game logic
    - [ ] Event flow order
    - [ ] Player Creation
    - [ ] Team Creation
    - [ ] Database
        - [ ] Table creation
        - [ ] Data insertation
- [ ] Refactor anything possible
    - [ ] Refer to chapter three in the textbook
- [ ] Beginning to add more blaseball events
    - [ ] Weather Events
    - [ ] Team Modifiers
    - [ ] Player Modifiers
- [ ] A whole lot of testing 
    - [ ] Added game logic
    - [ ] Blood interactions
    - [ ] Weather event limitations
    - [ ] Charm events 
- [ ] Add items
    - [ ] Special items
    - [ ] Damage
    - [ ] Modifications
- [ ] Testing
- [ ] Refactor
- [ ] Create API calls
    - [ ] Fetching data
    - [ ] Editing data
        - [ ] Creating new players
        - [ ] Creating new teams
        - [ ] Leagues and Divisions changing
- [ ] More testing
- [ ] Create front end
    - [ ] Find if front end recreation has already been acheived 
- [ ] Integration between front and backend
- [ ] More testing
- [ ] Refactoring if possible

Non-specific timed actions:

- [ ] Create automatic tests
- [ ] Database inserts for known data
    - [ ] Players
    - [ ] Teams
    - [ ] Divisions
- [ ] Season rule sets
    - [ ] When selecting season use info and formulas avalible at the time
- [ ] Documentation
- [ ] Spell check



Beyond scope:

- [ ] Shops
- [ ] Deity events
- [ ] Peanuts/Tickets
- [ ] Elections, wills, & decrees 
- [ ] User account specific information
- [ ] Change database and calls to be possible for single user without database
    - [ ] Saving info entered as cookies
    - [ ] New function for taking in saved cookie data and adding it to the 'required' data
- [ ] Deploy website?
    - [ ] Probably Google Cloud because need front and backend