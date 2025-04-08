import { type ActionFunctionArgs } from 'react-router';

export namespace Route {
    export type LoaderArgs = ActionFunctionArgs;
    export type ActionArgs = ActionFunctionArgs;
    export type ComponentProps = {
        loaderData: any;
        actionData?: any;
    };
}

export interface Info {
    loaderData: any;
    actionData?: any;
}

// These types are no longer needed since we're using any
// declare const loader: () => Promise<any>;
// declare const action: () => Promise<any>;