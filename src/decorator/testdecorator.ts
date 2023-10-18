
export const log = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // Capture the functional behavior of the decorated method
  const originalMethod = descriptor.value;
    // Override the decorated method's behavior with new behavior
    descriptor.value = function (...args: any[]) {
        args[args.length -1] = args[args.length -1] * 2 
        console.log(args[args.length -1]);
        
        const result = originalMethod.apply(this, args);

        return result;
  };
     return descriptor;
}