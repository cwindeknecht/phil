# To Do

1. I have popups rending based on clickable !== false because it was faster than adding it to every clickable object.
    * In general, just make rooms uniform in their key/value pairings.
2. Make it so the clickable objects render probably.  Absolute positioning is garbage.
3. When you die, it should wait three seconds, and then send you to the death screen.
4. Battles should have a roll button for damage instead of an automatic "you dealt this much damage".  
5. Figure out how to make the popups stop re-rendering their new clicked spot if you don't hit either option.  I'm guess it would be as simple as seeing if the state was set to something, and then not resetting the mouseX and mouseY on the state.
6. After talking, top bar text needs to display something else other than the original text.  It does it for battling, at least with the kobold for sure, because who can beat the golem...
7. Redo the warrior image so the bag of chips/tv/table aren't related to her and can be taken if you battle her.  As it stands now, they all
disappear and I just altered the text to show that.
8. Make comments for everything.
9. Either remove the ability to talk to people after the original talking has been done, or make them say something different.
10. Go all out with images.  Show rubble when the golem dies, or show him stepped aside.  Show the kobold point the spear and it turns blue, or if you kill him, have it leaning against the chest.  Have the warrior looking at the tv, and on examine, turn towards you.  Have her hold up the remote when she uses it to open the slab.
11. Add music / fx.  
12. Go through less files, take out any unnecessary things I left in there after the initial @media refactor.  I mean, in general, touch it it up too.  I'm just getting the bare minimum done right now.
13. Make sprites for battle.  Have a normal/striking/defending villager/opponent.
14. Have a question mark button that pops up a modal that explains how battles work.
15. After battle:
    * The examine option needs to display something different
    * The battle button needs to disappear.
16. For whatever reason, no matter what you choose when you talk to the elf, you battle the bag of chips.  This is fine for now, since Ryan has yet to provide the fourth room, but that'll be a problem later on.


    