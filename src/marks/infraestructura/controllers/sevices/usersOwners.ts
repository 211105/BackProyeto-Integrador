type Suspender<T> = {
    read: () => T;
};

const getSuspender = <T>(promise: Promise<T>): Suspender<T> => {
    let status: "pending" | "success" | "error" = "pending";
    let response: T | Error;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
    );

    const read = (): T => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response as T;
        }
    };

    return { read };
};

export function fetchData(url: string): Suspender<any> {
    const promise = fetch(url)
        .then((response) => response.json())
        .then((json) => json);

    return getSuspender(promise);
}
