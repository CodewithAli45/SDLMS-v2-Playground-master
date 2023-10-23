const utis = module.exports;

utis.getThreadsFromEaglebuilder = (builderData, MAX_THREADS=1) => {
    let { tracks } = builderData;
    let threads = [];

    if (tracks.length) {
        let { subtracks } = tracks[0];
        if (subtracks && subtracks.length) {
            for (let index = 0; index < MAX_THREADS; index++) {
                if (subtracks[index]) {
                    threads.push(subtracks[index]);
                }
            }
        }
    }

    return threads;
}

utis.getThreadsFromThreadbuilder = (builderData, MAX_THREADS=1) => {
    let { threads } = builderData;
    let processedThreads = [];

    if (threads.length) {
        let { subthreads } = threads[0];
        if (subthreads && subthreads.length) {
            for (let index = 0; index < MAX_THREADS; index++) {
                if (subthreads[index]) {
                    processedThreads.push(subthreads[index]);
                }
            }
        }
    }

    return processedThreads;
}