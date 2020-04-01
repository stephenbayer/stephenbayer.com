# C# Design Guide/Coding Standards

## Coding Conventions


Coding conventions serve the following purposes:

+ They create a consistent look to the code, so that readers can focus on content, not layout.

+ They enable readers to understand the code more quickly by making assumptions based on previous experience.

+ They facilitate copying, changing, and maintaining the code.

+ They demonstrate C# best practices.

### Namespace

+ Namespace should be separated with periods and begin with Company name, followed by the product name, then by assembly and feature
+ Each segment of a namespace should be PascalCase
+ Avoid using organizational units (such as IRSM or ITSD) in namespace as it is possible that another organization may take ownership
+ Avoid having identifier names clash with namespace names

### Using Directives/Imports

In short examples that do not include using directives, use namespace qualifications. If a namespace is imported by default in a project, you do not have to fully qualify the names from that namespace. Qualified names can be broken after a dot (.) if they are too long for a single line, as shown in the following example.

```csharp
    var currentPerformanceCounterCategory =
        new System.Diagnostics.
        PerformanceCounterCategory();
```

With anything more than the most basic examples, import statements should be used to keep code free of unnecessary clutter while avoiding name collisions and ambiguity.

Any unused imports should be removed.

## Usage and Naming Conventions

### Type Identifiers

An identifier is the name you assign to a type (class, interface, struct, delegate, or enum), member, variable, or namespace.  Identifier names, in general, should be clear, concise and easy to understand.  Above all, focus should be to write code that is readable and easy to maintain.

+ Identifiers should not contain two consecutive _ characters. Those names are reserved for compiler generated identifiers.

### Enum

Enums are a special kind of value type that respresent a closed set of choices.  Enums can also use _flags_ to support bitwise combinations of enum values.  Enums allow for strongly typed sets of values. 

+ Use PascalCase for Enums
+ Enum types use a singular noun for non-flags, and a plural noun for flags.
+ Use enums whenever possible instead of constant values
+ Do not provide a zero enum value

### Interface

An Interface is used to abstract functionality.  Developing against an interface rather than a specific class allows for a modular design.  As a general rule of thumb, if a class only contains properties it is considered an entity or model and should not generally use an interface.  However, if a class contains methods or functionality, an interface is suggested.

+ Interface names should be PascalCase and begin with an I
+ Interface names should be just descriptive enough to clearly state purpose
+ Interface names should not be overly complicated or longer than needed
+ Interface names should be adjective or noun phrases
+ Do not make interfaces too specific, as that would tie an interface to specific technologies or implementations which is what interfaces are designed to avoid
+ But also be wary of using generic terms such as "Manager" or "Helper" as this tends to lend itself to collecting too many semi-related functions
+ Capitalization should signify word boundaries even when using acronyms to avoid ambiguity
+ Consider Xml Documentation comments to document interface and methods

```csharp

    # good interface names
    public interface IUserService {}
    public interface ILocationWriter {}
    public interface IJsonParser {}
    public interface ITransferable {}

    # not as good interface names
    public interface PeopleMover {} // valid in the language, but should start with an "I"
    public interface IXMLReader {} // difficult to determine word boundary
    public interface IOraceUserRepository {} // ties interface to specific technology

```

### Struct

A struct is a basic construct of the common type system and is considered a "value type".  The data in a struct is kept within the memory space allotted for the struct.  Due to compute cycles involved in boxing and unboxing structs for use, only consider using a struct when instances will be small and consist of primitive types.

+ a structs should only be used to represent a single, immutable value
+ A struct in general should be under 16 bytes
+ Struct names should be PascalCase
+ Struct names should be noun or noun phrases
+ Capitalization should signify word boundaries even when using acronyms to avoid ambiguity
+ Struct should not contain a parameterless constructor
+ Struct should contain a constructor with the defined properties
+ Always implement IEquatable<T> on value types
+ Use Documentation Comments to document struct and properties

```csharp

    # good struct example

    /// <summary>
    /// <c>Vector3d</c> represents a three-dimentional point in space
    /// </summary>
    public struct Vector3d : IEquatable<Vector3d>
    {
      /// <summary>
      /// X Coordinate
      /// </summary>
      /// <value>value of X Coordinate</value>
      public int X { get; }

      /// <summary>
      /// Y Coordinate
      /// </summary>
      /// <value>value of Y Coordinate</value>
      public int Y { get; }

      /// <summary>
      /// Z Coordinate
      /// </summary>
      /// <value>value of Z Coordinate</value>
      public int Z { get; }

      /// <summary>
      /// Vector3d constructor
      /// </summary>
      /// <param name="x">X Coordinate</param>
      /// <param name="y">Y Coordinate</param>
      /// <param name="z">Z Coordinate</param>
      public Vector3d(int x, int y, int z)
      {
        this.X = x;
        this.Y = y;
        this.Z = z;
      }

      /// <summary>
      /// Indicates whether the current <c>Vector3d</c> is equal to other <c>Vector3d</c>
      /// </summary>
      /// <param name="other"><c>Vector3d</c> to test equality</param>
      /// <returns>true if the Vector3d is considered equal, otherwise false</returns>
      public bool Equals(Vector3d other)
      {
        return
            other?.X == this.X &&
            other?.Y == this.Y &&
            other?.X == this.Z
      }
    }

```

### Class

A struct is a basic construct of the common type system and, unlike the struct, is considered a "reference type".  Classes can be used for domain entities, view models, attributes, services, controllers, etc.  

+ A class should do one thing and do it well
+ If a class is longer than 500 lines, it may be doing too much and some code should be broken out into another class
+ Class names should be PascalCase
+ Class names should be noun or noun phrases
+ Consider postfixing names of derived classes with the name of base class
+ Capitalization should signify word boundaries even when using acronyms to avoid ambiguity
+ If classes contain more than data (ie. methods, events or functions), consider developing against an interface
+ Use Documentation Comments to document class, public methods and public properties

```csharp

    # class example

    /// <summary>
    /// <c>Bard</c> is a mostly useless character
    /// </summary>
    public class Bard : IMusician, ICharacter
    {
        private int _hitPoints = 0;

        /// <summary>
        /// Amount of life character has left
        /// </summary>
        /// <value>int value representing character life available</value>
        public int HitPoints { get{ return _hitPoints; }}

        /// <summary>
        /// Does the only thing a Bard Character can do
        /// </summary>
        public void PlayMusic() {
            // Code to play music
        }        
    }

```

### Attribute

An attribute is a particular type of class designed to manipulate meta data about the assembly, type, method or property being "decorated" by the attribute.

+ Use sealed classes for attributes
+ Attribute types should end with the word Attribute.
+ Provide constructor parameters and get only properties for required arguments
+ Provide mutatable parameters for optional arguments
+ Derive custom attributes from Attribue and use AttributeUsageAttribute to designate how attribute can be used

```csharp

    /// <summary>
    /// Save meta details about method
    /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class MethodUsageAttribute : Attribute
    {
       /// <summary>
       /// Usage description of the method 
       /// </summary>
       /// <value>description of how the method is used</value>
       public string Description { get; }

       /// <summary>
       /// name of author
       /// </summary>
       /// <value>Optional name of author</value>
       public string Author { get; set; }

       /// <summary>
       /// Constructor for the Method Usage Attribute
       /// </summary>
       /// <param name="description">method description of method</param>
       public MethodUsageAttribute(string description) {
          Description = description;
       }
    }


```


### Entity

A class or struct containing only properties is considered an entity or model.  An entity class is used like a container holding and passing data between.  Very little or, preferrably, no functionality or methods included in an entity class. 

+ As with other classes, name should be PascalCase
+ Class and properties should have Xml Documentation comments
+ Prefer immutable classes for entities

```csharp

    /// <summary>
    /// Person entity
    /// </summary>
    public class Person
    {
        public Person(string name, int age) {
           Name = name;
           Age = age;
        }

        /// <summary>
        /// Name as a person
        /// </summary>
        public string Name { get; }1

        /// <summary>
        /// Age of person
        /// </summary>
        public int Age { get; }
    }


```

## Usage and naming of type members

Statics and constants should be placed at the top followed by private member variables, then followed by public properties and methods.  Private methods should be placed at the bottom. 

### Method

A method is a code block that contains a statement or series of statements.  Methods contain functionality and logic of a type. 

+ Use PascalCase for Methods 
+ Give methods names that are verb phrases
+ Consider using the most restrictive modifier possible
+ Consider using interfaces to expose public methods

### Constant

Constants are used for predefined primative values.  The compiler burns the values of const fields directly into the calling code.  Therefore, const values can never be changed and must be initialized as they are declared.  Constants are almost always more desirable than bare strings or literal values. 

+ Use PascalCase for Constants 
+ If assigning messages or verbiage, consider using resource files

```csharp

    class LifeTheUniverseAndEverything
    {
        public const int Answer = 42;
    }
    

```

### Property

Properties are method pairs on a class called accessors including a getter (*get*) and a mutator (*set*) that are accessed as if they were fields on that class.  A property can provide protection for a class field to keep it from being changed without the knowledge of the object.  By ommitting the mutator, the property because read only, and only accessible from a class constructor. 

+ Use PascalCase for Properties 
+ Consider using read only property, if possible
+ Use auto properties when no accessor code is needed
+ When accessor code is simple, consider using expression body
+ Consider setting property to acceptable default value 

```csharp

    class TimePeriod
    {
        public string TimeZone { get; set; } = "GMT +0";
        
        // Auto accessor, setting acceptable initial value
        public int Seconds { get; set; }

        // read only property, accessor with expression body
        public double Hours 
        {
            get => Seconds * 3600;
        } 
    }
    

```

### Member Field (Instance Member)

Fields are variables declared at a class scope. Fields can be primatives, value types, or reference types. 

+ Use camelCase beginning with an undescore for private instance variables 
+ Use good clear names for private instance variables
+ Make member fields as restrictive as possible 
+ Do not provide instance fields that are public or protected
+ Make member fields read-only when only set from the constructor
+ Do not use Hungarian notation, modern tooling allows easy identification of declaration

```csharp

        public class TrainingVideo
        {
            // Readonly field only set by constructor
            private readonly string _fileType;

            // normal field
            private string[] _tags;

            public TrainingVideo(string fileType, string[] tags)
            {
                _fileType = fileType;
                _tags = tags;
            }

        }

```

### Local Variable

Local variable are declared within a block or scope.  

+ Use camelCase for local variables 
+ Use good clear names for local variables
+ Do not use Hungarian notation
+ Use var to declare local variables when the return type is obvious
+ Do not use var when using return value from a method

```csharp

    {
        var count = 0;
        var log = new StringBuilder();
        string userName = GetLoggedOnUser();
    }

```

### Method Parameter

Method parameters are variables passed to a method.  

+ Use camelCase for method parameter 
+ Use good clear names for most parameters
+ Parameters to an anonymous function can be short and abreviated if the use of the variable is clear
+ Do not use Hungarian notation

