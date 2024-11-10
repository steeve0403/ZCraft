<div align="center">
    <h1>SCSS Utility Classes</h1>     
    <img src="../../../public/assets/sass.png" width="50"  alt="icon sass">
</div>

<p align="center">
    Welcome to the SCSS Utility Classes documentation! This guide provides an overview of the available utility classes,
    their purposes, and how to use them effectively within your project. These utilities are designed to promote
consistency, enhance maintainability, and accelerate your development workflow.
</p>

<h2>Table of Contents</h2>

<ol>
    <li><a href="#overview">Overview</a> </li>
    <li><a href="#typography">Typography</a> </li>
    <li><a href="#color">Color</a> </li>
    <li><a href="#spacing">Spacing</a> </li>
    <li><a href="#border">Border</a> </li>
    <li><a href="#display">Display</a> </li>
    <li><a href="#position">Position</a> </li>
    <li><a href="#flex">Flex</a> </li>
    <li><a href="#sizing">Sizing</a> </li>
    <li><a href="#box-shadow">Box Shadow</a> </li>
    <li><a href="#opacity">Opacity</a> </li>
    <li><a href="#overflow">Overflow</a> </li>
    <li><a href="#visibility">Visibility</a> </li>
    <li><a href="#z-index">Z-index</a> </li>
</ol>





<h2 id="overview">Overview</h2>
<p align="center">
    Utility classes are single-purpose classes that apply specific styles to HTML elements. 
    They enable rapid development by allowing you to compose complex designs directly within your markup without writing additional CSS. 
    This approach promotes consistency and reduces the likelihood of CSS conflicts.
</p>

---

<h2 id="typography">Typography</h2>
<h3>Font Size</h3>
Apply predefined font sizes to elements.

| Class Name | Font Size |
|:----------:|:---------:|
|   .fs-xs   |  0.75rem  |
|   .fs-sm   | 0.875rem  |
|   .fs-md   |   1rem    |
|   .fs-lg   |  0.25rem  |
|   .fs-xl   |  0.5rem   |
|  .fs-xxl   |   2rem    |
<h4>Usage Example</h4>
```html

<h1 class="fs-xl">This is an extra-large text.</h1>
<p class="fs-md">This is a medium-sized text.</p>
```


<h3>Font Weight</h3>
Apply predefined font weights to elements.

| Class Name  | Font Weight |
|:-----------:|:-----------:|
| .fw-regular |     400     |
|   .fw-md    |     500     |
|  .fw-bold   |     700     |
<h4>Usage Example</h4>
```html
<p class="fw-bold">This text is bold.</p>
<span class="fw-medium">This text has medium weight.</span>
```


<h3>Text Alignment</h3>
Align text within elements.

|  Class Name   |     CSS Property     |
|:-------------:|:--------------------:|
|  .text-left   |  text-align: left;   |
| .text-center  | text-align: center;  |
|  .text-right  |  text-align: right;  |
| .text-justify | text-align: justify; |
<h4>Usage Example</h4>
```html
<div class="text-center">
    <p>This text is centered.</p>
</div>
```


<h3>Text Transform</h3>
Transform text within elements.

|    Class Name    |        CSS Property         |
|:----------------:|:---------------------------:|
| .text-uppercase  | text-transform: uppercase;  |
| .text-lowercase  | text-transform: lowercase;  |
| .text-capitalize | text-transform: capitalize; |
<h4>Usage Example</h4>
```html
<p class="text-uppercase">This text is uppercase.</p>
<p class="text-lowercase">THIS TEXT IS LOWERCASE.</p>
<p class="text-capitalize">this text is capitalized.</p>
```


<h3>Text Color</h3>
Apply predefined text colors to elements.

|   Class Name    |  Color Variable   |
|:---------------:|:-----------------:|
|  .text-primary  |  --color-primary  |
| .text-secondary | --color-secondary |
|  .text-accent   |  --color-accent   |
|  .text-neutral  |  --color-neutral  |
|   .text-error   |   --color-error   |
|  .text-success  |  --color-success  |
|   .text-info    |   --color-info    |
|  .text-warning  |  --color-warning  |
<h4>Usage Example</h4>
```html
<p class="text-primary">This text uses the primary color.</p>
<span class="text-success">Success message.</span>
```

---

<h2 id="color">Color</h2>

<h3>Background Color</h3>
Apply predefined background colors to elements.

|  Class Name   |  Color Variable   |
|:-------------:|:-----------------:|
|  .bg-primary  |  --color-primary  |
| .bg-secondary | --color-secondary |
|  .bg-accent   |  --color-accent   |
|  .bg-neutral  |  --color-neutral  |
|   .bg-error   |   --color-error   |
|  .bg-success  |  --color-success  |
|   .bg-info    |   --color-info    |
|  .bg-warning  |  --color-warning  |
<h4>Usage Example</h4>
```html
<div class="bg-primary text-white p-2">
  This div has a primary background.
</div>
```

---

<h2 id="spacing">Spacing</h2>
<h3>Margin</h3>
Apply predefined margin to elements.

| Class Name | Margin Value  |
|:----------:|:-------------:|
|    .m-0    |  margin: 0;   |
|    .m-1    | margin: 4px;  |
|    .m-2    | margin: 8px;  |
|    .m-3    | margin: 12px; |
|    .m-4    | margin: 16px; |
|    .m-5    | margin: 24px; |
|    .m-6    | margin: 32px; |

<h3>Directional Margin</h4>
Apply predefined margin to specific sides of an element.

| Class Name |           Margin Value           |
|:----------:|:--------------------------------:|
|   .mt-0    |          margin-top: 0;          |
|   .mr-0    |         margin-right: 0;         |
|   .mb-0    |        margin-bottom: 0;         |
|   .ml-0    |         margin-left: 0;          |
|   .mx-0    | margin-left: 0; margin-right: 0; |
|   .my-0    | margin-top: 0; margin-bottom: 0; |

#### Usage Example
```html
<div class="m-2">
  This div has a margin of 8px on all sides.
</div>

<p class="mt-3 mb-3">
  This paragraph has a top and bottom margin of 12px.
</p>
```

<h3>Padding</h3>
Apply predefined padding to elements.

| Class Name | Padding Value  |
|:----------:|:--------------:|
|    .p-0    |  padding: 0;   |
|    .p-1    | padding: 4px;  |
|    .p-2    | padding: 8px;  |
|    .p-3    | padding: 12px; |
|    .p-4    | padding: 16px; |
|    .p-5    | padding: 24px; |
|    .p-6    | padding: 32px; |

<h3>Directional Padding</h3>
Apply predefined padding to specific sides of an element.

| Class Name |           Padding Value            |
|:----------:|:----------------------------------:|
|   .pt-0    |          padding-top: 0;           |
|   .pr-0    |         padding-right: 0;          |
|   .pb-0    |         padding-bottom: 0;         |
|   .pl-0    |          padding-left: 0;          |
|   .px-0    | padding-left: 0; padding-right: 0; |
|   .py-0    | padding-top: 0; padding-bottom: 0; |

<h4>Usage Example</h4>
```html
<button class="p-2 bg-primary text-white">
  Click Me
</button>

<div class="px-3 py-2 bg-secondary">
  This div has horizontal padding of 12px and vertical padding of 8px.
</div>
```

---

<h2 id="border">Border</h2>

Apply predefined border styles to elements.

|   Class Name   |                 Border Style                  |
|:--------------:|:---------------------------------------------:|
|    .border     |    border: 1px solid var(--color-border);     |
|  .border-top   |  border-top: 1px solid var(--color-border);   |
| .border-right  | border-right: 1px solid var(--color-border);  |
| .border-bottom | border-bottom: 1px solid var(--color-border); |
|  .border-left  |  border-left: 1px solid var(--color-border);  |

<h3>Border Color</h3>
Apply predefined border colors to elements.

|    Class Name     |             Border Color              |
|:-----------------:|:-------------------------------------:|
|  .border-primary  |  border-color: var(--color-primary);  |
| .border-secondary | border-color: var(--color-secondary); |

<h4>Usage Example</h4>
```html
<div class="border border-primary rounded p-2">
  This div has a primary colored border with rounded corners.
</div>
```

<h3>Border Radius</h3>
Apply predefined border radius to elements.

| Class Name  | Border Radius |
|:-----------:|:-------------:|
|  .rounded   |     4px;      |
| .rounded-lg |     8px;      |

<h4>Usage Example</h4>
```html
<div class="rounded bg-neutral p-2">
  This div has rounded corners.
</div>

<div class="rounded-lg bg-secondary p-3">
  This div has larger rounded corners.
</div>
```

---

<h2 id="display">Display</h2>
Control the display property of elements.

|   Class Name    |    Display Property    |
|:---------------:|:----------------------:|
|    .d-block     |    display: block;     |
|    .d-inline    |    display: inline;    |
| .d-inline-block | display: inline-block; |
|     .d-flex     |     display: flex;     |
|     .d-grid     |     display: grid;     |
|     .d-none     |     display: none;     |


<h4>Usage Example</h4>
```html
<span class="d-inline-block bg-accent p-1">
  Inline Block Element
</span>

<div class="d-flex justify-between items-center">
  <p class="text-center">Centered Text</p>
</div>
```

---

<h2 id="position">Position</h2>
Control the position property of elements.

|     Class Name     |  Position Property  |
|:------------------:|:-------------------:|
| .position-absolute | position: absolute; |
| .position-relative | position: relative; |
|  .position-fixed   |  position: fixed;   |
|  .position-static  |  position: static;  |
|  .position-sticky  |  position: sticky;  |

<h4>Usage Example</h4>
```html
<div class="position-relative">
  <span class="position-absolute top-0 right-0">Absolute Positioned</span>
</div>
```
Note: For top, right, bottom, left utilities, consider adding more utility classes as needed.


---


<h2 id="flex">Flex</h2>

<h3>Flex Direction</h3>
Control the flex property of elements.

|  Class Name  |      Flex Property      |
|:------------:|:-----------------------:|
|  .flex-row   |  flex-direction: row;   |
| .flex-column | flex-direction: column; |

<h3>Flex Wrap</h3>
Control the flex-wrap property of elements.

|  Class Name  |   Flex Property    |
|:------------:|:------------------:|
|  .flex-wrap  |  flex-wrap: wrap;  |
| .flex-nowrap | flex-wrap: nowrap; |

<h3>Justify</h3>
Control the justify-content property of elements.
    
|    Class Name    |        Justify  Property        |
|:----------------:|:-------------------------------:|
|  .justify-start  |  justify-content: flex-start;   |
|   .justify-end   |   justify-content: flex-end;    |
| .justify-center  |    justify-content: center;     |
| .justify-between | justify-content: space-between; |
| .justify-around  | justify-content: space-around;  |

<h3>Align</h3>
Control the align-items property of elements.

|   Class Name    |     Align  Property      |
|:---------------:|:------------------------:|
|  .items-start   | align-items: flex-start; |
|   .items-end    |  align-items: flex-end;  |
|  .items-center  |   align-items: center;   |
| .items-baseline |  align-items: baseline;  |
| .items-stretch  |  align-items: stretch;   |

<h4>Usage Example</h4>
```html
<div class="d-flex flex-row justify-center items-center">
  <div class="p-2">Item 1</div>
  <div class="p-2">Item 2</div>
  <div class="p-2">Item 3</div>
</div>
```

---

<h2 id="sizing">Sizing</h2>
Control the width and height of elements.

<h3>Width</h3>
Apply predefined width to elements.

| Class Name | Width Value |
|:----------:|:-----------:|
|   .w-100   |    100%;    |
|  .w-auto   |    auto;    |
|    .w-0    |     0;      |
|    .w-1    |    4px;     |
|    .w-2    |    8px;     |
|    .w-3    |    12px;    |
|    .w-4    |    16px;    |
|    .w-5    |    24px;    |
|    .w-6    |    32px;    |

<h3>Height</h3>
Apply predefined height to elements.

| Class Name | Height Value |
|:----------:|:------------:|
|   .h-100   |    100%;     |
|  .h-auto   |    auto;     |
|    .h-0    |     0;       |
|    .h-1    |    4px;      |
|    .h-2    |    8px;      |
|    .h-3    |    12px;     |
|    .h-4    |    16px;     |
|    .h-5    |    24px;     |
|    .h-6    |    32px;     |
    
<h4>Usage Example</h4>
```html
<img src="image.jpg" class="w-100 h-auto" alt="Responsive Image">
<div class="w-4 h-4 bg-primary"></div>
```

---

<h2 id="box-shadow">Box Shadow</h2>
Apply predefined box shadow to elements.

|  Class Name  |         Box Shadow Value         |
|:------------:|:--------------------------------:|
|  .shadow-sm  | 0 1px 2px  var(--shadow-color);  |
|  .shadow-md  | 0 4px 6px  var(--shadow-color);  |
|  .shadow-lg  | 0 10px 16px var(--shadow-color); |
| .shadow-none |              none;               |

<h4>Usage Example</h4>
```html
<div class="p-4 bg-white rounded shadow-md">
  This div has a medium shadow.
</div>
```

---

<h2 id="opacity">Opacity</h2>
Apply predefined opacity to elements.

| Class Name | Opacity Value |
|:----------:|:-------------:|
|   .opacity-0   |    0;    |
|   .opacity-25  |   0.25;  |
|   .opacity-50  |   0.5;   |
|   .opacity-75  |   0.75;  |
|   .opacity-100 |    1;    |

<h4>Usage Example</h4>
```html
<div class="bg-primary text-white p-2 opacity-50">
  This div has 50% opacity.
```

---

<h2 id="overflow">Overflow</h2>
Control the overflow property of elements.

|    Class Name     | Overflow Property  |
|:-----------------:|:------------------:|
|  .overflow-auto   |  overflow: auto;   |
| .overflow-hidden  | overflow: hidden;  |
| .overflow-visible | overflow: visible; |
| .overflow-scroll  | overflow: scroll;  |
|  .overflow-auto   |  overflow: auto;   |

<h4>Usage Example</h4>
```html
<div class="overflow-auto h-100">
    <!-- Content that may overflow -->
</div>
```

---

<h2 id="visibility">Visibility</h2>
Control the visibility property of elements.

|    Class Name    | Visibility Property |
|:----------------:|:-------------------:|
|  .visibility-visible  | visibility: visible;  |
| .visibility-hidden    | visibility: hidden;   |
| .visibility-collapse  | visibility: collapse; |


<h4>Usage Example</h4>
```html
<p class="invisible">This text is hidden.</p>
```

---

<h2 id="z-index">Z-index</h2>
Apply predefined z-index to elements.

| Class Name | Z-index Value |
|:----------:|:-------------:|
|   .z-0     |      0;       |
|   .z-10    |     10;       |
|   .z-20    |     20;       |
|   .z-30    |     30;       |
|   .z-40    |     40;       |
|   .z-50    |     50;       |

<h4>Usage Example</h4>
```html
<div class="z-10">
  This div has a z-index of 10.
</div>
```

---

<h2>Custom Typography Utilities</h2>
These classes are tailored to your project's specific typography needs, leveraging CSS custom properties for dynamic theming.

|          Class Name           |             Description             |
|:-----------------------------:|:-----------------------------------:|
|       .text-main-title	       |       Styles for main titles        |
|    .text-primary-subtitle	    |    Styles for primary subtitles     |
|   .text-secondary-subtitle	   |   Styles for secondary subtitles    |
|          .text-body	          |        Styles for body text         |
|    .text-quotes-keypoints     |   Styles for quotes and keypoints   |
|    .text-main-navigation	     |   Styles for main navigation text   |
| .text-primary-action-button	  |  Styles for primary action buttons  |
| .text-secondary-action-button | Styles for secondary action buttons |
|         .text-caption         |         Styles for captions         |

<h4>Usage Example</h4>
```html
<h1 class="text-main-title">Welcome to MyApp</h1>
<p class="text-body">This is a sample body text.</p>
<span class="text-caption">Additional information here.</span>
```

---

