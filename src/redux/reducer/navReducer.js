import { NavigationActions } from "react-navigation";

import { AppNavigator } from '../../navigators/AppRouter';
import {
    SUCCESS_PAYMENT,
    NAVIGATE_TO_ORDER
} from '../../redux/constants/actionTypes'


const initialState = AppNavigator.router.getStateForAction(
    AppNavigator.router.getActionForPathAndParams('Home')
);

export default (state = initialState, action) => {
    let nextState;
    switch (action.type) {
        //   case SIGN_IN_RETRIEVED:
        //     nextState = RootNavigator.router.getStateForAction(
        //       NavigationActions.navigate({
        //         routeName: 'MainStack'
        //       }),
        //       state
        //     );
        //     // NavigationActions.reset({
        //     //   index: 0,
        //     //   actions: [
        //     //     NavigationActions.navigate({ routeName: 'MainStack' }),
        //     //     //NavigationActions.navigate({ routeName: 'AppStack' })
        //     //   ]
        //     // })
        //     // );
        //     break;
        //   case 'SIGN_OUT':
        //     nextState = RootNavigator.router.getStateForAction(
        //       NavigationActions.reset({
        //         index: 1,
        //         actions: [
        //           NavigationActions.navigate({ routeName: 'SignIn' }),
        //           NavigationActions.navigate({ routeName: 'MainStack' })
        //         ]
        //       })
        //     );
        //     break;
        //   case 'SIGN_OUT_THEN_GO_MAIN':
        //     nextState = RootNavigator.router.getStateForAction(
        //       NavigationActions.reset({
        //         index: 1,
        //         key: null,
        //         actions: [
        //           NavigationActions.navigate({
        //             routeName: 'SignIn'
        //           }),
        //           NavigationActions.navigate({
        //             routeName: 'MainStack'
        //           })
        //         ]
        //       })
        //     );
        //     break;

        // case 'NAVIGATE_DOCTORS': {
        //   nextState = AppNavigator.router.getStateForAction(
        //     NavigationActions.navigate({
        //       routeName: 'homeTab'
        //     }),
        //     action.payload.state
        //   );

        //   // nextState = AppNavigator.router.getStateForAction(
        //   // 	NavigationActions.reset({
        //   // 		index: 0,
        //   // 		actions: [
        //   // 			NavigationActions.navigate({
        //   // 				routeName: 'bookLabTest'
        //   // 			})
        //   // 		],
        //   // 		key: 'homeTab'
        //   // 	})
        //   // );
        //   break;
        // }
        case SUCCESS_PAYMENT:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                    ]
                }), state
            );
            break;
        case NAVIGATE_TO_ORDER:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 1,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                        NavigationActions.navigate({ routeName: 'Order' })
                    ]
                }), state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};

