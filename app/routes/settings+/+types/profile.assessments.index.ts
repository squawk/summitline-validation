import { type $PropertySchemas } from '@remix-run/core/src/routes';
import { type DataFunctionArgs, type MetaFunction, type SerializeFrom } from '@remix-run/node';

export namespace Route {
    export type LoaderArgs = DataFunctionArgs;
    export type ActionArgs = DataFunctionArgs;
    export type MetaFunction = MetaFunction;
    export type ComponentProps = {
        loaderData: SerializeFrom<typeof loader>;
        actionData?: SerializeFrom<typeof action>;
    };
}

export interface Info {
    loaderData: SerializeFrom<typeof loader>;
    actionData?: SerializeFrom<typeof action>;
}

declare module "@remix-run/react" {
    interface RouteHandles {
        $PropertySchemas?: $PropertySchemas;
    }
}