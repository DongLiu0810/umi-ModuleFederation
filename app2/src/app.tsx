type OnGlobalStateChangeCallback = (
  state: Record<string, any>,
  prevState: Record<string, any>,
) => void;
type OnGlobalStateChange = (
  callback: OnGlobalStateChangeCallback,
  fireImmediately?: boolean,
) => void;
export const qiankun = {
  // 应用加载之前
  // async bootstrap(props:any) {
  //   console.log('app1 bootstrap', props);
  // },
  // 应用 render 之前触发
  async mount(props: { onGlobalStateChange: OnGlobalStateChange }) {
    props.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log('子应用加载完成', state, prevState);
      localStorage.setItem('hyperchainToken', prevState.token);
    }, true);

    // props.setGlobalState();
  },

  // 应用卸载之后触发
  // async unmount(props: any) {
  //   console.log(props);
  // },
};
