/*

Hit Advancment

Works for any baserunner checking to see if they advance an extra base after a hit (except batter obviously)

df["threshold_rounded"] = 0.70 - 1.0*df["fielder_tenaciousness"] + 0.60*df['runner_continuation']
df["threshold_rounded"] = df["threshold_rounded"].clip(lower=0.01,upper=0.95)


*/