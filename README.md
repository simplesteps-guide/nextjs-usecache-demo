This is a [SimpleSteps.guide](https://simplesteps.guide) small project to demonstrate use cache feature in NextJS.
The full guide can be found [here](https://simplesteps.guide/guides/technology/web-development/next-js-use-cache/use-cache).

## Getting Started

First go to the directory in your terminal where you want the project folder to be saved, and clone the project,

```bash
git clone https://github.com/simplesteps-guide/nextjs-usecache-demo.git
```

change to the project directory:

```bash
cd nextjs-usecache-demo
```

install the node packages:

```bash
pnpm install
```

then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the menu page and select an example.

## Use Cache Example

This displays a simple calculator form.

You can enter 2 numbers and select one of the 2 buttons.

Blue button: runs the getData1 function which applies no caching, so every time it waits 3 seconds and then returns the sum of the numbers and the time stamp after the calcualtion.

Green button: runs the getData2 function which does have chacing applied, so first time it gets called with new input values, it will wait the 3 seconds, after that other requests for the same pair of numbers will return the cached value immediately and the time stamp of when the intial caching occured.

Both buttons will also display the launch time of when the button was clicked.

## CacheTag Example

This example is similar to the example above but only has the single calculate button, that runs getData3 function and always applies caching.

There are 2 revalidate tag buttons.

1 revalidates all instances as it calls the revalidate 'my-all-tag'.

1 revalidates the 'all-val1-xx' tag, which revalidates a dynamic tag with whatever value 1 is set at, at the moment.

If you revalidate the all tag, then all cache is cleared, so you can go back to previously used values and see that it takes 3 seconds to do the calculation again for the first attempt at those numbers again.

If you revalidate the specific val 1 tag, you will see that only calculations that used that number as value 1 will be cleared, any other previously cached results will still be cached.

eg.

| try | value 1 | value 2 | action      | result                                      |
| --- | ------- | ------- | ----------- | ------------------------------------------- |
| 1   | 10      | 10      | calculate   | 3 second wait and 20 sum                    |
| 2   | 10      | 10      | calculate   | quick cache return 20 sum                   |
| 3   | 20      | 20      | calculate   | 3 second wait and 40 sum                    |
| 4   | 10      | 10      | calculate   | quick cache return 20 sum                   |
| 5   | 20      | 20      | calculate   | quick cache return 40 sum                   |
| 6   | any     | any     | my-all-tag  | will clear all cached results               |
| 7   | 10      | 10      | calculate   | 3 second wait and 20 sum                    |
| 8   | 20      | 20      | calculate   | 3 second wait and 40 sum                    |
| 9   | 10      | 10      | calculate   | quick cache return 20 sum                   |
| 10  | 20      | 20      | calculate   | quick cache return 40 sum                   |
| 11  | 10      | any     | all-val1-xx | will clear cached results where val 1 is 10 |
| 12  | 10      | 10      | calculate   | 3 second wait and 20 sum                    |
| 13  | 20      | 20      | calculate   | quick cache return 40 sum                   |
| 14  | 20      | any     | all-val1-xx | will clear cached results where val 1 is 20 |
| 15  | 10      | 10      | calculate   | quick cache return 20 sum                   |
| 16  | 20      | 20      | calculate   | 3 second wait and 40 sum                    |

## CacheLife Example

cacheLife setting lets you specify 3 parameters: stale, revalidate and expire times for how long the cache should be stored.

This demo is setup to display the differences between the 3 values, however, at time of writting, in the current NextJS version with the experimental setting turned on, only the revalidate parameter is actually used. So as it stands it will serve a cached copy until the revalidate time is reached and then the next request after that will go and fetch fresh data and effectively reset the cache.

I will leave the full options up though, so as and when the complete fucntionality is released, it can be tested and demonstrated.

ie. if you set stale as 10 seconds, revalidate as 20 seconds and expire as 30 seconds. 0-20 seconds after first caching will return cached results, after 20 seconds it will get fresh results and serve that for the next 20 seconds. I haven't checked the canary branch to see if it is more complete yet on there, but what is working at the moment seems stable and useful.
