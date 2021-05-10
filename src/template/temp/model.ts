@ObjectType()
export class <%= singular(classify(name)) %> {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}<% } else { %>export class <%= singular(classify(name)) %> {}<% } %>
