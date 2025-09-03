/*
The foul ball formula seems to be:

foul_threshold = 0.25 + 0.1*fwd - 0.1*obt + 0.1*batter_vibes*((musc + thwack + div)/3 + 0.2*hypediff)

(musc, thwack, div are not already vibed in here)

Rolls below this threshold are fouls, rolls above it are fair.
*/